import { Component } from '@angular/core';
import { CustomerService } from '../../../../services/customer.service';
import { SettingsService } from '../../../../services/settings.service';
import { Customer } from '../../../../models/customer/customer';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CustomerFormModalComponent } from '../customer-form-modal/customer-form-modal.component';
import { ConfirmationModalComponent } from '../../../modals/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent {

  public constructor(
    private _customerService: CustomerService,
    private _settingsService: SettingsService,
    private _bsModalService: BsModalService) {

  }

  public customers: Customer[] = [];

  public error: Error;
  public formSuccessful: boolean;
  public errorMessages: string[] = [];
  public informationMessages: string[] = [];
  public warningMessages: string[] = [];

  public ngOnInit(): void {

    this.fillTable();

  }

  public fillTable() {

    this._customerService.getByStoreIdAsync(this._settingsService.getStore().id).subscribe(result => {
      if (result.isSuccessful) {

        this.customers = result.data;
        // alert(this.customers.length);
      }
      else {
        this.errorMessages = result.errorMessages;
      }
    },
      error => {
        this.error = error;
        console.error(error);
      }
    );


  }

  public onClickAddNew() {

    let customer = new Customer();

    const modal = this._bsModalService.show(CustomerFormModalComponent,
      { class: 'modal-dialog-centered modal-dialog' });

    (<CustomerFormModalComponent>modal.content).showConfirmationModal(customer);
    (<CustomerFormModalComponent>modal.content).onClose.subscribe(result => {
      if (result == true) {

        let newCustomer = modal.content.customer;
        newCustomer.storeId = this._settingsService.getStore().id;
        //alert(newCat.name);
        this._customerService.insertAsync(newCustomer)
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

  public onClickEdit(customer: Customer) {

    const modal = this._bsModalService.show(CustomerFormModalComponent,
      { class: 'modal-dialog-centered modal-dialog' });

    (<CustomerFormModalComponent>modal.content).showConfirmationModal(customer);
    (<CustomerFormModalComponent>modal.content).onClose.subscribe(result => {
      if (result == true) {

        let newCustomer = modal.content.customer;
        newCustomer.storeId = this._settingsService.getStore().id;
        this._customerService.updateAsync(newCustomer).subscribe(result => {

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

  public onClickDelete(customer: Customer) {

    let strTitle = 'حذف';
    let strBody = 'آیا مایل به حذف هستید؟'

    const modal = this._bsModalService.show(ConfirmationModalComponent,
      { class: 'modal-dialog-centered modal-dialog' });

    (<ConfirmationModalComponent>modal.content).showConfirmationModal(
      strTitle, strBody
    );

    (<ConfirmationModalComponent>modal.content).onClose.subscribe(result => {
      if (result === true) {

        this._customerService.deleteByIdAsync(customer).subscribe(
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
