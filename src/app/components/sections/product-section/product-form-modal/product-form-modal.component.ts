import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../../../../models/product/product';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CategorySelectModalComponent } from '../../category-section/category-select-modal/category-select-modal.component';

@Component({
  selector: 'app-product-form-modal',
  templateUrl: './product-form-modal.component.html',
  styleUrl: './product-form-modal.component.css'
})
export class ProductFormModalComponent {
  public active: boolean = false;
  public title: string;
  public onClose: Subject<boolean>;
  public error: Error;
  public product:Product;

  public constructor(
    private _bsModalRef: BsModalRef,
    private _bsModalService: BsModalService) { }

  public ngOnInit(): void {

    this.onClose = new Subject();

  }

  public onConfirm(): void {

    if (this.isValidForm() == false)
      return;

    this.active = false;
    this.onClose.next(true);
    this._bsModalRef.hide();

  }

  public selectCategory() {

    const modal = this._bsModalService.show(CategorySelectModalComponent,
      { class: 'modal-xl modal-dialog-centered modal-dialog' });

    (<CategorySelectModalComponent>modal.content).showConfirmationModal();

    (<CategorySelectModalComponent>modal.content).onClose.subscribe(result => {

      if (result == true) {

        this.product.categoryId = modal.content.selectedCategory.id;
        this.product.category = modal.content.selectedCategory;
        
      }

    });

  }

  public isValidForm(): boolean {

    var result = true;

    if (!this.product.name) {

      result = false;

    }

    if (!this.product.price) {

      result = false;

    }

    if (!this.product.categoryId) {

      result = false;

    }
    
    return result;
  }

  public showConfirmationModal(product:Product): void {

    this.product = product;

    if (product?.id)

      this.title = 'ویرایش';

    else {

      this.title = 'جدید';

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


}
