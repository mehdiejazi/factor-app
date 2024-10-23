import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Factor } from '../../../../models/factor/factor';
import { FactorService } from '../../../../services/factor.service';
import { FactorItem } from '../../../../models/factor-item/factor-item';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FactorItemFormModalComponent } from '../factor-item-form-modal/factor-item-form-modal.component';
import { FactorItemService } from '../../../../services/factor-item.service';
import { ConfirmationModalComponent } from '../../../modals/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-factor-detail',
  templateUrl: './factor-detail.component.html',
  styleUrl: './factor-detail.component.css'
})
export class FactorDetailComponent implements OnInit {

  public constructor(
    private _route: ActivatedRoute,
    private _factorService: FactorService,
    private _factorItemService: FactorItemService,
    private _bsModalService: BsModalService) {
  }

  public factor: Factor;

  public error: Error;
  public formSuccessful: boolean;
  public errorMessages: string[] = [];
  public informationMessages: string[] = [];
  public warningMessages: string[] = [];

  public ngOnInit(): void {
    this._route.queryParams.subscribe(params => {
      if (params['id']) {

        this._factorService.getFactorWithItemsByIdAsync(params['id']).subscribe(result => {

          if (result.isSuccessful) {
            this.factor = result.data;
            this.factor.isClosed = true;
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

    });

  }
  public onClickDecQuantity(item: FactorItem) {

    if (item.quantity == 1) return;
    item.quantity--;

  }
  public onClickIncQuantity(item: FactorItem) {

    item.quantity++;

  }
  public onClickAddNew() {

    let factorItem = new FactorItem();

    const modal = this._bsModalService.show(FactorItemFormModalComponent,
      { class: 'modal-lg modal-dialog-centered modal-dialog' });

    (<FactorItemFormModalComponent>modal.content).showConfirmationModal(factorItem);
    (<FactorItemFormModalComponent>modal.content).onClose.subscribe(result => {
      if (result == true) {

        let newItem = modal.content.factorItem;
        newItem.factorId = this.factor.id;

        this._factorItemService.insertAsync(newItem).subscribe(result => {

          if (result.isSuccessful) {

            this.formSuccessful = true;
            this.factor.factorItems.splice(0, 0, newItem);
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
  public onClickEdit(factorItem: FactorItem) {

    const modal = this._bsModalService.show(FactorItemFormModalComponent,
      { class: 'modal-lg modal-dialog-centered modal-dialog' });

    (<FactorItemFormModalComponent>modal.content).showConfirmationModal(factorItem);
    (<FactorItemFormModalComponent>modal.content).onClose.subscribe(result => {
      if (result == true) {

        let newItem = modal.content.factorItem;

        this._factorItemService.updateAsync(newItem).subscribe(result => {

          if (result.isSuccessful) {

            this.formSuccessful = true;
            factorItem = result.data;

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
  public onClickDelete(factorItem: FactorItem) {

    let strTitle = 'حذف';
    let strBody = 'آیا مایل به حذف هستید؟'

    const modal = this._bsModalService.show(ConfirmationModalComponent,
      { class: 'modal-dialog-centered modal-dialog' });

    (<ConfirmationModalComponent>modal.content).showConfirmationModal(
      strTitle, strBody
    );

    (<ConfirmationModalComponent>modal.content).onClose.subscribe(result => {
      if (result == true) {

        this._factorItemService.deleteByIdAsync(factorItem).subscribe(result => {

          if (result.isSuccessful) {

            this.formSuccessful = true;
            this.factor.factorItems =
              this.factor.factorItems
                .filter(i => i.id != factorItem.id);

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
