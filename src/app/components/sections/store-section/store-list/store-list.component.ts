import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { StoreFormModalComponent } from '../store-form-modal/store-form-modal.component';
import { Store } from '../../../../models/store/store';
import { StoreService } from '../../../../services/store.service';
import { ConfirmationModalComponent } from '../../../modals/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrl: './store-list.component.css'
})
export class StoreListComponent implements OnInit {

  public constructor(
    private _bsModalService: BsModalService,
    private _storeService: StoreService) { }

  public stores: Store[] = [];

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

    this._storeService.getByOwnerAsync().subscribe(result => {
      if (result.isSuccessful) {
        this.stores = result.data;
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
    let text = '';

    let strTitle = text;
    let strBody = 'آیا مایل به ' + text + ' این سوال هستید؟';

    let store = new Store();

    const modal = this._bsModalService.show(StoreFormModalComponent,
      { class: 'modal-xl modal-dialog-centered modal-dialog' });

    (<StoreFormModalComponent>modal.content).showConfirmationModal(store);
    (<StoreFormModalComponent>modal.content).onClose.subscribe(result => {
      if (result == true) {

        let newStore = modal.content.store;

        this._storeService.insertAsync(newStore)
          .subscribe(result => {

            if (result.isSuccessful) {

              this.formSuccessful = true;
              this.fillTable();

            }
            else {

              this.errorMessages = result.errorMessages;
              //this.errorMessages.forEach(x => alert(x));
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

  public onClickEdit(store: Store) {

    const modal = this._bsModalService.show(StoreFormModalComponent,
      { class: 'modal-xl modal-dialog-centered modal-dialog' });

    (<StoreFormModalComponent>modal.content).showConfirmationModal(store);
    (<StoreFormModalComponent>modal.content).onClose.subscribe(result => {
      if (result == true) {

        var newstore = modal.content.store;

        this._storeService.updateAsync(newstore).subscribe(result => {

          if (result.isSuccessful) {

            this.formSuccessful = true;
            store = newstore;

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

  public onClickDelete(store: Store) {

    let strTitle = 'حذف';
    let strBody = 'آیا مایل به حذف هستید؟'

    const modal = this._bsModalService.show(ConfirmationModalComponent,
      { class: 'modal-dialog-centered modal-dialog' });

    (<ConfirmationModalComponent>modal.content).showConfirmationModal(
      strTitle, strBody
    );

    (<ConfirmationModalComponent>modal.content).onClose.subscribe(result => {
      if (result === true) {

        this._storeService.deleteByIdAsync(store).subscribe(result => {

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
