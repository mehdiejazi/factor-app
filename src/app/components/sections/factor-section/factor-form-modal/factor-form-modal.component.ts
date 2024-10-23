import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { Factor } from '../../../../models/factor/factor';
import { CustomerSelectModalComponent } from '../../customer-section/customer-select-modal/customer-select-modal.component';
import { PersianDateModalComponent } from '../../../modals/persian-date-modal/persian-date-modal.component';
import momentJalaali from 'moment-jalaali';

@Component({
  selector: 'app-factor-form-modal',
  templateUrl: './factor-form-modal.component.html',
  styleUrl: './factor-form-modal.component.css'
})
export class FactorFormModalComponent {

  public active: boolean = false;
  public title: string;
  public onClose: Subject<boolean>;
  public error: Error;
  public factor: Factor;
  public sellDateTime:string;
  public constructor(
    private _bsModalRef: BsModalRef,
    private _bsModalService: BsModalService) { }

  public ngOnInit(): void {

    this.onClose = new Subject();

  }

  public onClickDateSelect() {
    const modal = this._bsModalService.show(PersianDateModalComponent,
      { class: 'modal-dialog-centered modal-dialog' });
    (<PersianDateModalComponent>modal.content).showConfirmationModal(true);
    (<PersianDateModalComponent>modal.content).onClose.subscribe(result => {

      if (result === true) {

        this.sellDateTime = modal.content.persianDate;
        this.factor.sellDateTime = momentJalaali(modal.content.date).format('YYYY-MM-DD HH:mm');;

      } else if (result === false) {

      }

    });
  }


  public selectCustomer() {

    const modal = this._bsModalService.show(CustomerSelectModalComponent,
      { class: 'modal-xl modal-dialog-centered modal-dialog' });

    (<CustomerSelectModalComponent>modal.content).showConfirmationModal();
    (<CustomerSelectModalComponent>modal.content).onClose.subscribe(result => {

      if (result == true) {

        this.factor.ownerId = modal.content.selectedCustomer.id;
        this.factor.owner = modal.content.selectedCustomer;

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

    if (!this.factor.description) {

      result = false;

    }

    return result;
  }

  public showConfirmationModal(factor: Factor): void {

    this.factor = factor;

    if (factor?.id)

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
