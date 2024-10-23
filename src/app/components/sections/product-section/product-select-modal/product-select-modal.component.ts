import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SettingsService } from '../../../../services/settings.service';
import { Product } from '../../../../interfaces/product/product';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-product-select-modal',
  templateUrl: './product-select-modal.component.html',
  styleUrl: './product-select-modal.component.css'
})
export class ProductSelectModalComponent {
  public active: boolean = false;
  public title: string;
  public onClose: Subject<boolean>;
  public error: Error;
  public products: Product[];
  public productsFilter: Product[];
  public selectedProduct: Product;

  public txtSearch: string;

  public constructor(private _bsModalRef: BsModalRef,
    private _productService:ProductService,
    private _settingsService: SettingsService) { }

  public ngOnInit(): void {

    this.onClose = new Subject();
  }


  public fillProducts() {

    this._productService.getByStoreIdAsync(this._settingsService.getStore().id)
      .subscribe(
        result => {

          this.products = result.data;
          this.productsFilter = this.products;

        },
        error => {

          this.error = error;
          console.error(error);

        }
      );
  }


  public showConfirmationModal(): void {

    this.fillProducts();
    this.title = 'انتخاب دسته بندی';
    this.active = true;

  }

  public hideConfirmationModal(): void {

    this.active = false;
    this.onClose.next(false);
    this._bsModalRef.hide();

  }

  public onCancel(): void {

    this.active = false;
    this.onClose.next(false);
    this._bsModalRef.hide();

  }

  public onTextChangedSearch(newValue: any): void {

    this.productsFilter = this.products
      .filter(bsh => bsh.name.includes(newValue));

  }

  public unSelectCards() {

    var cards = document.querySelectorAll(".card-items");
    cards.forEach(element => {
      element.classList.remove('bg-primary');
    });

  }

  public onCardClick(e: any, product: Product): void {

    this.unSelectCards();

    const clickedElement = e.target;

    if (clickedElement.closest('.card-items')) {
      clickedElement.closest('.card-items').classList.add('bg-primary');
    }

    this.selectedProduct = product;

  }

  public onConfirm() {

    this.active = false;
    this.onClose.next(true);
    this._bsModalRef.hide();

  }
}
