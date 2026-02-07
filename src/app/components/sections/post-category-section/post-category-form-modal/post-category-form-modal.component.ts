import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { PostCategory } from '../../../../models/post-category/post-category';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-post-category-form-modal',
  templateUrl: './post-category-form-modal.component.html',
  styleUrl: './post-category-form-modal.component.css'
})
export class PostCategoryFormModalComponent {
  public active: boolean = false;
  public title: string;
  public onClose: Subject<boolean>;
  public error: Error;
  public postCategory: PostCategory;

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

    if (!this.postCategory.name) {

      result = false;

    }

    return result;
  }

  public showConfirmationModal(postCategory: PostCategory): void {

    this.postCategory = postCategory;

    if (postCategory?.id)

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