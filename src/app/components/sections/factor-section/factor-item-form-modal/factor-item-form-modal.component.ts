import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { PersianDateModalComponent } from '../../../modals/persian-date-modal/persian-date-modal.component';
import momentJalaali from 'moment-jalaali';
import { FactorItem } from '../../../../models/factor-item/factor-item';
import { ProductSelectModalComponent } from '../../product-section/product-select-modal/product-select-modal.component';
import { Product } from '../../../../models/product/product';

@Component({
  selector: 'app-factor-item-form-modal',
  templateUrl: './factor-item-form-modal.component.html',
  styleUrl: './factor-item-form-modal.component.css'
})
export class FactorItemFormModalComponent {

  public active: boolean = false;
  public title: string;
  public onClose: Subject<boolean>;
  public error: Error;
  public factorItem: FactorItem;

  public constructor(
    private _bsModalRef: BsModalRef,
    private _bsModalService: BsModalService) { }

  public ngOnInit(): void {

    this.onClose = new Subject();

  }


  public selectProduct() {

    const modal = this._bsModalService.show(ProductSelectModalComponent,
      { class: 'modal-lg modal-dialog-centered modal-dialog' });

    (<ProductSelectModalComponent>modal.content).showConfirmationModal();
    (<ProductSelectModalComponent>modal.content).onClose.subscribe((result: boolean) => {

      if (result == true) {

        this.factorItem.productId = modal.content.selectedProduct.id;
        this.factorItem.product = modal.content.selectedProduct;
        this.factorItem.price = modal.content.selectedProduct.price;
      }

    });

  }

  public onConfirm(): void {

    if (this.isValidForm() == false)
      return;

    this.active = false;
    this.onClose.next(true);
    this._bsModalRef.hide();

  }


  public isValidForm(): boolean {

    var result = true;

    if (!this.factorItem.productId) {
      result = false;
    }

    return result;
  }

  public showConfirmationModal(factorItem: FactorItem): void {

    this.factorItem = factorItem;

    if (factorItem?.id)

      this.title = 'ویرایش';

    else {

      this.title = 'جدید';
      factorItem.product = new Product();
      factorItem.quantity = 1;
      factorItem.offPercent = 0;
      
    }

    this.active = true;

  }

  public hideConfirmationModal(): void {

    this.active = false;
    this.onClose.next(false);
    this._bsModalRef.hide();

  }

  public onCancel(): void {

    this.hideConfirmationModal();

  }
  
  public onClickDecQuantity(item: FactorItem) {

    if (item.quantity == 1) return;
    item.quantity--;

  }
  public onClickIncQuantity(item: FactorItem) {

    item.quantity++;

  }


}
