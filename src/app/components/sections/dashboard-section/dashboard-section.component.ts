import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { CategoryService, CategorySaleTotalQuantity } from '../../../services/category.service';
import { FactorSaleHourly, FactorSaleWeekDaily, FactorService } from '../../../services/factor.service';
import { ProductSaleTotalQuantity, ProductService } from '../../../services/product.service';
import { SettingsService } from '../../../services/settings.service';
import { LanguageService } from '../../../i18n/language.service';
import { Factor } from '../../../interfaces/factor/factor';

interface DayRevenue {
  day: string;
  revenue: number;
  label: string;
}

interface MetricSummary {
  label: string;
  count: number;
  amount: number;
}

interface HourlyChartItem {
  label: string;
  revenue: number;
}

interface WeekdayChartItem {
  label: string;
  revenue: number;
}

@Component({
  selector: 'app-dashboard-section',
  templateUrl: './dashboard-section.component.html',
  styleUrl: './dashboard-section.component.css'
})
export class DashboardSectionComponent implements OnInit {
  public settings: SettingsService;
  public todayRevenue = 0;
  public todayFactorsCount = 0;
  public totalProductsCount = 0;
  public revenueData: DayRevenue[] = [];
  public hourlyRevenueData: HourlyChartItem[] = [];
  public weekdayRevenueData: WeekdayChartItem[] = [];
  public topProducts: ProductSaleTotalQuantity[] = [];
  public categorySales: CategorySaleTotalQuantity[] = [];
  public recentFactors: Factor[] = [];
  public summaryCards: MetricSummary[] = [];
  public hasSelectedStore = false;
  public isLoading = true;

  constructor(
    _settings: SettingsService,
    private _factorService: FactorService,
    private _productService: ProductService,
    private _categoryService: CategoryService,
    private readonly languageService: LanguageService
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

    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - 6);
    weekStart.setHours(0, 0, 0, 0);

    forkJoin({
      factorsResult: this._factorService.getByStoreIdAsync(storeId),
      productsResult: this._productService.getByStoreIdAsync(storeId),
      topProductsResult: this._productService.getTop10SaleByQuantityAsync(storeId),
      categoriesResult: this._categoryService.getSaleTotalQuantityAsync(storeId, monthStart, now.toISOString()),
      hourlyResult: this._factorService.getHourlyFactorSaleAsync(storeId, dayStart, now.toISOString()),
      weekdayResult: this._factorService.getWeekDailyFactorSaleAsync(storeId, weekStart.toISOString(), now.toISOString())
    }).subscribe({
      next: ({ factorsResult, productsResult, topProductsResult, categoriesResult, hourlyResult, weekdayResult }) => {
        const factors = factorsResult.isSuccessful && factorsResult.data ? factorsResult.data : [];
        const products = productsResult.isSuccessful && productsResult.data ? productsResult.data : [];

        this.totalProductsCount = products.length;
        this.topProducts = topProductsResult.isSuccessful && topProductsResult.data ? topProductsResult.data.slice(0, 5) : [];
        this.categorySales = categoriesResult.isSuccessful && categoriesResult.data ? categoriesResult.data.slice(0, 5) : [];
        this.recentFactors = factors.slice(0, 5);

        this.calculateTodayRevenue(factors);
        this.generateRevenueData(factors);
        this.buildSummaryCards(factors);
        this.hourlyRevenueData = this.buildHourlyRevenue(hourlyResult.data || []);
        this.weekdayRevenueData = this.buildWeekdayRevenue(weekdayResult.data || []);
        this.isLoading = false;
      },
      error: error => {
        console.error('خطا در بارگذاری داشبورد', error);
        this.isLoading = false;
      }
    });
  }

  private resetDashboardData(): void {
    this.todayRevenue = 0;
    this.todayFactorsCount = 0;
    this.totalProductsCount = 0;
    this.revenueData = [];
    this.hourlyRevenueData = [];
    this.weekdayRevenueData = [];
    this.topProducts = [];
    this.categorySales = [];
    this.recentFactors = [];
    this.summaryCards = [];
  }

  private calculateTodayRevenue(factors: Factor[]): void {
    const today = new Date().toISOString().split('T')[0];
    this.todayRevenue = 0;
    this.todayFactorsCount = 0;

    factors.forEach(factor => {
      const factorDate = factor.sellDateTime ? factor.sellDateTime.split('T')[0] : null;
      if (factor.isClosed && factorDate === today) {
        this.todayRevenue += factor.totalPrice || 0;
        this.todayFactorsCount++;
      }
    });
  }

  private buildSummaryCards(factors: Factor[]): void {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - 6);
    weekStart.setHours(0, 0, 0, 0);

    this.summaryCards = [
      this.createMetricSummary('این ماه', factors, factor => new Date(factor.sellDateTime) >= monthStart),
      this.createMetricSummary('۷ روز اخیر', factors, factor => new Date(factor.sellDateTime) >= weekStart),
      this.createMetricSummary('کل فروش بسته', factors, factor => factor.isClosed),
    ];
  }

  private createMetricSummary(label: string, factors: Factor[], predicate: (factor: Factor) => boolean): MetricSummary {
    const selected = factors.filter(factor => factor.isClosed && factor.sellDateTime && predicate(factor));
    return {
      label,
      count: selected.length,
      amount: selected.reduce((sum, factor) => sum + this.toNumber(factor.totalPrice), 0)
    };
  }

  private generateRevenueData(factors: Factor[]): void {
    const last7Days = this.getLast7Days();
    const revenueByDay: { [key: string]: number } = {};

    last7Days.forEach(day => {
      revenueByDay[day] = 0;
    });

    factors.filter(factor => factor.isClosed).forEach(factor => {
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

  private buildHourlyRevenue(items: FactorSaleHourly[]): HourlyChartItem[] {
    const revenueByHour = new Map<number, number>();
    for (let hour = 0; hour < 24; hour++) {
      revenueByHour.set(hour, 0);
    }

    items.forEach(item => revenueByHour.set(item.hour, this.toNumber(item.totalPrice)));

    return Array.from(revenueByHour.entries())
      .filter(([hour]) => hour >= 6 && hour <= 23)
      .map(([hour, revenue]) => ({
        label: `${hour.toString().padStart(2, '0')}:00`,
        revenue,
      }));
  }

  private buildWeekdayRevenue(items: FactorSaleWeekDaily[]): WeekdayChartItem[] {
    const dayLabels = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'];
    return dayLabels.map((label, index) => ({
      label,
      revenue: this.toNumber(items.find(item => item.dayOfWeek === index)?.totalPrice)
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
    const locale = this.languageService.currentLanguage === 'fa' ? 'fa-IR' : 'en-US';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'IRR',
      minimumFractionDigits: 0
    }).format(value);
  }

  public getMaxValue(values: number[]): number {
    if (values.length === 0) {
      return 1;
    }

    return Math.max(...values, 1);
  }

  public getBarHeight(value: number, values: number[]): number {
    const max = this.getMaxValue(values);
    return max > 0 ? (value / max) * 100 : 0;
  }

  public revenueValues(items: { revenue: number }[]): number[] {
    return items.map(item => item.revenue);
  }

  public quantityValues(items: { totalQuantity: number }[]): number[] {
    return items.map(item => this.toNumber(item.totalQuantity));
  }

  private toNumber(value: unknown): number {
    const numberValue = Number(value);
    return Number.isFinite(numberValue) ? numberValue : 0;
  }
}
