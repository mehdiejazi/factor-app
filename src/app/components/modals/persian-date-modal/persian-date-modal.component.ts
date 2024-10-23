import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import momentJalaali from 'moment-jalaali';
import { IActiveDate } from 'ng-persian-datepicker';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-persian-date-modal',
  templateUrl: './persian-date-modal.component.html',
  styleUrl: './persian-date-modal.component.css'
})
export class PersianDateModalComponent {
  public active: boolean = false;
  public title: string;
  public onClose: Subject<boolean>;
  public date: Date = undefined;
  public persianDate: string = undefined;
  public isTimeEnabled: boolean;
  public dateFormat: string = "";

  public constructor(
      private _bsModalRef: BsModalRef,
      private _formBuilder: UntypedFormBuilder,
  ) { }


  public form: UntypedFormGroup = this._formBuilder.group({
      dateValue: new Date().valueOf(),
  });

  public onSelect(event: IActiveDate): void {
      const viaTimestampValue = new Date(event.timestamp);
      const viaGregorianDate = new Date(event.gregorian);
      this.date = viaGregorianDate;
  }

  public ngOnInit(): void {
      this.onClose = new Subject();
  }

  public showConfirmationModal(isTimeEnabled: boolean): void {
      this.isTimeEnabled = isTimeEnabled;
      this.title = 'انتخاب تاریخ';
      this.active = true;

      if (this.isTimeEnabled)
          this.dateFormat = 'jDD/jMM/jYYYY HH:mm';
      else
          this.dateFormat = 'jDD/jMM/jYYYY';
  }

  public onConfirm(): void {
      if (this.date == undefined)
          return;

      this.persianDate = momentJalaali(this.date).format(this.dateFormat)

      this.active = false;
      this.onClose.next(true);
      this._bsModalRef.hide();
  }

  public onCancel(): void {
      this.active = false;
      this.onClose.next(false);
      this._bsModalRef.hide();
  }

  public hideConfirmationModal(): void {
      this.active = false;
      this.onClose.next(false);
      this._bsModalRef.hide();
  }
}
