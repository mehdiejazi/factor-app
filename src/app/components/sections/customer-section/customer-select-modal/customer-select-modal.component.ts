import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { Customer } from '../../../../models/customer/customer';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SettingsService } from '../../../../services/settings.service';
import { CustomerService } from '../../../../services/customer.service';

@Component({
  selector: 'app-customer-select-modal',
  templateUrl: './customer-select-modal.component.html',
  styleUrl: './customer-select-modal.component.css'
})
export class CustomerSelectModalComponent {

  public active: boolean = false;
  public title: string;
  public onClose: Subject<boolean>;
  public error: Error;
  public customers: Customer[];
  public customersFilter: Customer[];
  public selectedCustomer: Customer;

  public txtSearch: string;

  public constructor(private _bsModalRef: BsModalRef,
    private _customerService: CustomerService,
    private _settingsService: SettingsService) { }

  public ngOnInit(): void {

    this.onClose = new Subject();
  }


  public fillStores() {

    this._customerService.getByStoreIdAsync(this._settingsService.getStore().id)
      .subscribe(
        result => {

          this.customers = result.data;
          this.customersFilter = this.customers;
        },
        error => {

          this.error = error;
          console.error(error);

        }
      );
  }


  public showConfirmationModal(): void {

    this.fillStores();
    this.title = 'انتخاب مشتری';
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

    this.customersFilter = this.customers
      .filter(cus => cus.firstName.includes(newValue) || cus.lastName.includes(newValue));

  }

  public unSelectCards() {

    var cards = document.querySelectorAll(".card-items");
    cards.forEach(element => {
      element.classList.remove('bg-primary');
    });

  }

  public onCardClick(e: any, customer:Customer): void {

    this.unSelectCards();

    const clickedElement = e.target;

    if (clickedElement.closest('.card-items')) {
      clickedElement.closest('.card-items').classList.add('bg-primary');
    }

    this.selectedCustomer = customer;

  }

  public onConfirm() {

    this.active = false;
    this.onClose.next(true);
    this._bsModalRef.hide();

  }
}



