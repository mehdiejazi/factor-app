import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { Category } from '../../../../models/category/category';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-category-form-modal',
  templateUrl: './category-form-modal.component.html',
  styleUrl: './category-form-modal.component.css'
})
export class CategoryFormModalComponent {
  public active: boolean = false;
  public title: string;
  public onClose: Subject<boolean>;
  public error: Error;
  public category:Category;

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


  public isValidForm(): boolean {

    var result = true;

    if (!this.category.name) {

      result = false;

    }

    return result;
  }

  public showConfirmationModal(category: Category): void {

    this.category = category;

    if (category?.id)

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
