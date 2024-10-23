import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FactorService } from '../../../../services/factor.service';
import { SettingsService } from '../../../../services/settings.service';
import { Factor } from '../../../../models/factor/factor';
import { FactorFormModalComponent } from '../factor-form-modal/factor-form-modal.component';
import { ConfirmationModalComponent } from '../../../modals/confirmation-modal/confirmation-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-factor-list',
  templateUrl: './factor-list.component.html',
  styleUrl: './factor-list.component.css'
})
export class FactorListComponent {
  public constructor(
    private _bsModalService: BsModalService,
    private _factorService: FactorService,
    private _settingsService: SettingsService,
  private _router: Router) {

  }

  public factors: Factor[] = [];
  public filterFactors: Factor[] = [];

  public filterStatus: string = 'all';

  public error: Error;
  public formSuccessful: boolean;
  public errorMessages: string[] = [];
  public informationMessages: string[] = [];
  public warningMessages: string[] = [];

  public ngOnInit(): void {

    this.fillTable();

  }

  public filter(filter: string) {

    switch (filter) {
      case 'all': 
        this.filterFactors = this.factors;
        break
      case 'deleted':  
        this.filterFactors = this.factors.filter(x => x.isDeleted == true);
        break
      case 'not deleted':  
        this.filterFactors = this.factors.filter(x => x.isDeleted == false);
        break
      default:

        break
    }

  }


  public fillTable() {

    this._factorService.getByStoreIdAsync(this._settingsService.getStore().id).subscribe(result => {

      if (result.isSuccessful) {

        this.factors = result.data;
        this.filterFactors = this.factors;
        this.filter(this.filterStatus);

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

    let factor = new Factor();

    const modal = this._bsModalService.show(FactorFormModalComponent,
      { class: 'modal-dialog-centered modal-dialog' });

    (<FactorFormModalComponent>modal.content).showConfirmationModal(factor);
    (<FactorFormModalComponent>modal.content).onClose.subscribe(result => {

      if (result == true) {

        let newFactor = modal.content.factor;
        newFactor.storeId = this._settingsService.getStore().id;

        this._factorService.insertAsync(newFactor).subscribe(result1 => {

          if (result1.isSuccessful) {

            this.formSuccessful = true;

            alert(result1.isSuccessful);

            this.fillTable();
          }
          else {

            this.errorMessages = result1.errorMessages;

          }

          if (result1.informationMessages !== null)
            this.informationMessages = result1.informationMessages;

          if (result1.warningMessages !== null)
            this.warningMessages = result1.warningMessages;
        },
          error => {

            this.error = error;

          }
        );

      }
    });
  }

  public onClickEdit(factor: Factor) {

    this.formSuccessful = false;

    let factorClone: Factor = JSON.parse(JSON.stringify(factor));

    const modal = this._bsModalService.show(FactorFormModalComponent,
      { class: 'modal-dialog-centered modal-dialog' });

    (<FactorFormModalComponent>modal.content).showConfirmationModal(factorClone);
    (<FactorFormModalComponent>modal.content).onClose.subscribe(result => {
      if (result == true) {

        let newFactor = modal.content.factor;
        newFactor.storeId = this._settingsService.getStore().id;
        this._factorService.updateAsync(newFactor).subscribe(result => {

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

  public onClickDetail(factor: Factor) {

    this._router.navigate(['/factors/detail'], { queryParams: { id: factor.id } });

  }

  public onClickDelete(factor: Factor) {

    let strTitle = 'حذف';
    let strBody = 'آیا مایل به حذف هستید؟'

    const modal = this._bsModalService.show(ConfirmationModalComponent,
      { class: 'modal-dialog-centered modal-dialog' });

    (<ConfirmationModalComponent>modal.content).showConfirmationModal(
      strTitle, strBody
    );

    (<ConfirmationModalComponent>modal.content).onClose.subscribe(result => {
      if (result === true) {

        this._factorService.deleteByIdAsync(factor).subscribe(result => {

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
