import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SettingsService } from '../../../../services/settings.service';
import { PostCategoryService } from '../../../../services/post-category.service';
import { PostCategory } from '../../../../models/post-category/post-category';
import { ConfirmationModalComponent } from '../../../modals/confirmation-modal/confirmation-modal.component';
import { PostCategoryFormModalComponent } from '../post-category-form-modal/post-category-form-modal.component';

@Component({
  selector: 'app-post-category-list',
  templateUrl: './post-category-list.component.html',
  styleUrl: './post-category-list.component.css'
})
export class PostCategoryListComponent implements OnInit {

  public constructor(
    private _bsModalService: BsModalService,
    private _postCategoryService: PostCategoryService,
    private _settingsService: SettingsService) {

  }

  public postCategories: PostCategory[] = [];

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

    this._postCategoryService.getAllAsync().subscribe(result => {
      if (result.isSuccessful) {

        this.postCategories = result.data;

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

    let cat = new PostCategory();

    const modal = this._bsModalService.show(PostCategoryFormModalComponent,
      { class: 'modal-dialog-centered modal-dialog' });

    (<PostCategoryFormModalComponent>modal.content).showConfirmationModal(cat);
    (<PostCategoryFormModalComponent>modal.content).onClose.subscribe(result => {
      if (result == true) {

        let newCat = modal.content.postCategory;
        this._postCategoryService.insertAsync(newCat).subscribe(result => {

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

  public onClickEdit(cat: PostCategory) {


    const modal = this._bsModalService.show(PostCategoryFormModalComponent,
      { class: 'modal-dialog-centered modal-dialog' });

    (<PostCategoryFormModalComponent>modal.content).showConfirmationModal(cat);
    (<PostCategoryFormModalComponent>modal.content).onClose.subscribe(result => {
      if (result == true) {

        let newCat = modal.content.postCategory;
        this._postCategoryService.updateAsync(newCat).subscribe(result => {

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

  public onClickDelete(cat: PostCategory) {

    let strTitle = 'حذف';
    let strBody = 'آیا مایل به حذف هستید؟'

    const modal = this._bsModalService.show(ConfirmationModalComponent,
      { class: 'modal-dialog-centered modal-dialog' });

    (<ConfirmationModalComponent>modal.content).showConfirmationModal(
      strTitle, strBody
    );

    (<ConfirmationModalComponent>modal.content).onClose.subscribe(result => {
      if (result === true) {

        this._postCategoryService.deleteByIdAsync(cat).subscribe(result => {

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
