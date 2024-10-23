import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { Customer } from '../../../../interfaces/customer/customer';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-customer-form-modal',
  templateUrl: './customer-form-modal.component.html',
  styleUrl: './customer-form-modal.component.css'
})
export class CustomerFormModalComponent {

  public active: boolean = false;
  public title: string;
  public onClose: Subject<boolean>;
  public error: Error;
  public customer:Customer;

  public constructor(
    private _bsModalRef: BsModalRef) { }

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

    if (!this.customer.firstName) {

      result = false;

    }

    if (!this.customer.lastName) {

      result = false;

    }

    return result;
  }

  public showConfirmationModal(customer:Customer): void {

    this.customer = customer;

    if (customer?.id)

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
