import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../services/settings.service';
import { FactorService } from '../../../services/factor.service';
import { ProductService } from '../../../services/product.service';

interface DayRevenue {
  day: string;
  revenue: number;
  label: string;
}

@Component({
  selector: 'app-dashboard-section',
  templateUrl: './dashboard-section.component.html',
  styleUrl: './dashboard-section.component.css'
})
export class DashboardSectionComponent implements OnInit {
  public settings: SettingsService;
  public todayRevenue: number = 0;
  public todayFactorsCount: number = 0;
  public lowStockProducts: any[] = [];
  public totalProductsCount: number = 0;
  public revenueData: DayRevenue[] = [];
  public hasSelectedStore: boolean = false;
  public isLoading: boolean = true;

  constructor(
    _settings: SettingsService,
    private _factorService: FactorService,
    private _productService: ProductService
  ) {
    this.settings = _settings;
  }

  public ngOnInit(): void {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    this.isLoading = true;
    this.resetDashboardData();

    const storeId = this.settings.getStore()?.id ?? null;
    this.hasSelectedStore = !!storeId;

    if (!this.hasSelectedStore) {
      this.isLoading = false;
      return;
    }

    this._factorService.getByStoreIdAsync(storeId).subscribe(
      result => {
        if (result.isSuccessful && result.data) {
          this.calculateTodayRevenue(result.data);
          this.generateRevenueData(result.data);
        }
      },
      error => {
        console.error('خطا در بارگذاری فاکتورها', error);
      }
    );

    this._productService.getByStoreIdAsync(storeId).subscribe(
      result => {
        if (result.isSuccessful && result.data) {
          this.totalProductsCount = result.data.length;
          this.getLowStockProducts(result.data);
        }
        this.isLoading = false;
      },
      error => {
        console.error('خطا در بارگذاری محصولات', error);
        this.isLoading = false;
      }
    );
  }

  private resetDashboardData(): void {
    this.todayRevenue = 0;
    this.todayFactorsCount = 0;
    this.lowStockProducts = [];
    this.totalProductsCount = 0;
    this.revenueData = [];
  }

  private calculateTodayRevenue(factors: any[]): void {
    const today = new Date().toISOString().split('T')[0];

    this.todayRevenue = 0;
    this.todayFactorsCount = 0;

    factors.forEach(factor => {
      const factorDate = factor.sellDateTime ? factor.sellDateTime.split('T')[0] : null;

      if (factorDate === today) {
        this.todayRevenue += factor.totalPrice || 0;
        this.todayFactorsCount++;
      }
    });
  }

  private getLowStockProducts(products: any[]): void {
    const threshold = 10;

    this.lowStockProducts = products
      .filter((product: any) => (product.quantity || 0) < threshold)
      .slice(0, 5);
  }

  private generateRevenueData(factors: any[]): void {
    const last7Days = this.getLast7Days();
    const revenueByDay: { [key: string]: number } = {};

    last7Days.forEach(day => {
      revenueByDay[day] = 0;
    });

    factors.forEach(factor => {
      const factorDate = factor.sellDateTime ? factor.sellDateTime.split('T')[0] : null;

      if (factorDate && Object.prototype.hasOwnProperty.call(revenueByDay, factorDate)) {
        revenueByDay[factorDate] += factor.totalPrice || 0;
      }
    });

    this.revenueData = last7Days.map(day => ({
      day,
      revenue: revenueByDay[day],
      label: this.formatDatePersian(day)
    }));
  }

  private getLast7Days(): string[] {
    const days: string[] = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      days.push(date.toISOString().split('T')[0]);
    }

    return days;
  }

  private formatDatePersian(dateStr: string): string {
    const parts = dateStr.split('-');
    return `${parts[2]}/${parts[1]}`;
  }

  public formatCurrency(value: number): string {
    return new Intl.NumberFormat('fa-IR', {
      style: 'currency',
      currency: 'IRR',
      minimumFractionDigits: 0
    }).format(value);
  }

  public getMaxRevenue(): number {
    if (this.revenueData.length === 0) {
      return 1;
    }

    return Math.max(...this.revenueData.map(d => d.revenue), 1);
  }

  public getBarHeight(revenue: number): number {
    const max = this.getMaxRevenue();
    return max > 0 ? (revenue / max) * 100 : 0;
  }
}
