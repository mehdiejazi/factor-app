import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Product } from '../../../../models/product/product';
import { ProductService } from '../../../../services/product.service';
import { ProductFormModalComponent } from '../product-form-modal/product-form-modal.component';
import { Category } from '../../../../models/category/category';
import { SettingsService } from '../../../../services/settings.service';
import { ConfirmationModalComponent } from '../../../modals/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  public constructor(
    private _bsModalService: BsModalService,
    private _productService: ProductService,
    private _settingsService: SettingsService) { }

  public products: Product[] = [];

  public error: Error;
  public formSuccessful: boolean;
  public errorMessages: string[] = [];
  public informationMessages: string[] = [];
  public warningMessages: string[] = [];
  public isLoading: boolean = false;

  public ngOnInit(): void {

    this.fillTable();

  }

  public fillTable() {
    this.isLoading = true;

    this._productService.getByStoreIdAsync(this._settingsService.getStore().id).subscribe(result => {
      if (result.isSuccessful) {

        this.products = result.data;

      }
      else {
        this.errorMessages = result.errorMessages;
      }
      this.isLoading = false;
    },
      error => {
        this.error = error;
        console.error(error);
        this.isLoading = false;
      }
    );

  }

  public onClickAddNew() {

    let product = new Product();
    product.category = new Category();
    product.storeId = this._settingsService.getStore().id;

    const modal = this._bsModalService.show(ProductFormModalComponent,
      { class: 'modal-dialog-centered modal-dialog' });

    (<ProductFormModalComponent>modal.content).showConfirmationModal(product);
    (<ProductFormModalComponent>modal.content).onClose.subscribe(result => {
      if (result == true) {

        let newProduct = modal.content.product;

        this._productService.insertAsync(newProduct).subscribe(result => {

          if (result.isSuccessful) {

            this.formSuccessful = true;
            this.fillTable();
          }
          else {

            this.errorMessages = result.errorMessages;

          }

          if (result.informationMessages !== null)
            this.informationMessages = result.informationMessages;

          if (result.warningMessages !== null)
            this.warningMessages = result.warningMessages;
        },
          error => {

            this.error = error;

          }
        );
      }
    });

  }

  public onClickEdit(product: Product) {

    const modal = this._bsModalService.show(ProductFormModalComponent,
      { class: 'modal-dialog-centered modal-dialog' });

    (<ProductFormModalComponent>modal.content).showConfirmationModal(product);
    (<ProductFormModalComponent>modal.content).onClose.subscribe(result => {
      if (result == true) {

        let newProduct = modal.content.product;
        newProduct.storeId = this._settingsService.getStore().id;
        this._productService.updateAsync(newProduct).subscribe(result => {

          if (result.isSuccessful) {

            this.formSuccessful = true;
            this.fillTable();
          }
          else {

            this.errorMessages = result.errorMessages;

          }

          if (result.informationMessages !== null)
            this.informationMessages = result.informationMessages;

          if (result.warningMessages !== null)
            this.warningMessages = result.warningMessages;
        },
          error => {
            this.error = error;
          }
        );

      }
    });
  }

  public onClickDelete(product: Product) {

 let strTitle = 'حذف';
    let strBody = 'آیا مایل به حذف هستید؟'

    const modal = this._bsModalService.show(ConfirmationModalComponent,
      { class: 'modal-dialog-centered modal-dialog' });

    (<ConfirmationModalComponent>modal.content).showConfirmationModal(
      strTitle, strBody
    );

    (<ConfirmationModalComponent>modal.content).onClose.subscribe(result => {
      if (result === true) {

        this._productService.deleteByIdAsync(product).subscribe(
          result => {

            if (result.isSuccessful) {
              this.fillTable();
              this.formSuccessful = true;
            }
            else {
              result.errorMessages.forEach(msg => this.errorMessages.push(msg));
            }

            result.informationMessages.forEach(msg => this.informationMessages.push(msg));
            result.warningMessages.forEach(msg => this.warningMessages.push(msg));

          },
          error => {

            this.error = error;
            console.error(error);

          }
        );

      }
    });
  }

}
