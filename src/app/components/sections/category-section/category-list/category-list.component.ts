import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Category } from '../../../../models/category/category';
import { CategoryFormModalComponent } from '../category-form-modal/category-form-modal.component';
import { CategoryService } from '../../../../services/category.service';
import { SettingsService } from '../../../../services/settings.service';
import { ConfirmationModalComponent } from '../../../modals/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {

  public constructor(
    private _bsModalService: BsModalService,
    private _categoryService: CategoryService,
    private _settingsService: SettingsService) {

  }

  public categories: Category[] = [];

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

    this._categoryService.getByStoreIdAsync(this._settingsService.getStore().id).subscribe(result => {
      if (result.isSuccessful) {

        this.categories = result.data;

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

    let cat = new Category();

    const modal = this._bsModalService.show(CategoryFormModalComponent,
      { class: 'modal-dialog-centered modal-dialog' });

    (<CategoryFormModalComponent>modal.content).showConfirmationModal(cat);
    (<CategoryFormModalComponent>modal.content).onClose.subscribe(result => {
      if (result == true) {

        let newCat = modal.content.category;
        newCat.storeId = this._settingsService.getStore().id;
        //alert(newCat.name);
        this._categoryService.insertAsync(newCat)
          .subscribe(result => {

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

  public onClickEdit(cat: Category) {


    const modal = this._bsModalService.show(CategoryFormModalComponent,
      { class: 'modal-dialog-centered modal-dialog' });

    (<CategoryFormModalComponent>modal.content).showConfirmationModal(cat);
    (<CategoryFormModalComponent>modal.content).onClose.subscribe(result => {
      if (result == true) {

        let newCat = modal.content.category;
        newCat.storeId = this._settingsService.getStore().id;
        this._categoryService.updateAsync(newCat).subscribe(result => {

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

  public onClickDelete(cat: Category) {

    let strTitle = 'حذف';
    let strBody = 'آیا مایل به حذف هستید؟'

    const modal = this._bsModalService.show(ConfirmationModalComponent,
      { class: 'modal-dialog-centered modal-dialog' });
      
    (<ConfirmationModalComponent>modal.content).showConfirmationModal(
      strTitle, strBody
    );

    (<ConfirmationModalComponent>modal.content).onClose.subscribe(result => {
      if (result === true) {

        this._categoryService.deleteByIdAsync(cat).subscribe(
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
