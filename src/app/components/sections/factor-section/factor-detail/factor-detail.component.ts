import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  styleUrls: ['./factor-detail.component.css']
})
export class FactorDetailComponent implements OnInit {

  public constructor(
    private _route: ActivatedRoute,
    private _factorService: FactorService,
    private _factorItemService: FactorItemService,
    private _bsModalService: BsModalService,
    private _router: Router) {
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

  public onClickCloseFactor(): void {
    if (!this.factor || this.factor.isClosed) {
      return;
    }

    const modal = this._bsModalService.show(ConfirmationModalComponent,
      { class: 'modal-dialog-centered modal-dialog' });

    (<ConfirmationModalComponent>modal.content).showConfirmationModal(
      'بستن فاکتور',
      'آیا از بستن این فاکتور مطمئن هستید؟'
    );

    (<ConfirmationModalComponent>modal.content).onClose.subscribe(result => {
      if (result !== true) {
        return;
      }

      const updateReq: Factor = { ...this.factor, isClosed: true };
      this._factorService.updateAsync(updateReq).subscribe(
        updateResult => {
          if (updateResult.isSuccessful) {
            this.formSuccessful = true;
            this.factor = updateResult.data;
            return;
          }

          this.errorMessages = updateResult.errorMessages ?? [];
        },
        error => {
          this.error = error;
          console.error(error);
        }
      );
    });
  }

  public onClickDeleteFactor(): void {
    if (!this.factor) {
      return;
    }

    const modal = this._bsModalService.show(ConfirmationModalComponent,
      { class: 'modal-dialog-centered modal-dialog' });

    (<ConfirmationModalComponent>modal.content).showConfirmationModal(
      'حذف فاکتور',
      'آیا از حذف این فاکتور مطمئن هستید؟'
    );

    (<ConfirmationModalComponent>modal.content).onClose.subscribe(result => {
      if (result !== true) {
        return;
      }

      this._factorService.deleteByIdAsync(this.factor).subscribe(
        deleteResult => {
          if (deleteResult.isSuccessful) {
            this._router.navigate(['/factors/list']);
            return;
          }

          this.errorMessages = deleteResult.errorMessages ?? [];
        },
        error => {
          this.error = error;
          console.error(error);
        }
      );
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
            Object.assign(factorItem, result.data);

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
    let strBody = 'آیا مایل به حذف هستید؟';

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

  public trackFactorItem(index: number, item: FactorItem): string | number {
    return item?.id || index;
  }

  public getItemFinalPrice(item: FactorItem): number {
    const quantity = this.toNumber(item?.quantity);
    const price = this.toNumber(item?.price);
    const offPercent = this.toNumber(item?.offPercent);
    const normalizedOffPercent = Math.min(100, Math.max(0, offPercent));
    return price * quantity * (1 - normalizedOffPercent / 100);
  }

  public getTotalQuantity(): number {
    if (!this.factor?.factorItems?.length) {
      return 0;
    }

    return this.factor.factorItems
      .reduce((sum, item) => sum + this.toNumber(item?.quantity), 0);
  }

  public getTotalDiscount(): number {
    return this.getSubtotalPrice() - this.getTotalFinalPrice();
  }

  public getTotalFinalPrice(): number {
    if (!this.factor?.factorItems?.length) {
      return 0;
    }

    return this.factor.factorItems
      .reduce((sum, item) => sum + this.getItemFinalPrice(item), 0);
  }

  private getSubtotalPrice(): number {
    if (!this.factor?.factorItems?.length) {
      return 0;
    }

    return this.factor.factorItems
      .reduce((sum, item) => {
        const quantity = this.toNumber(item?.quantity);
        const price = this.toNumber(item?.price);
        return sum + (price * quantity);
      }, 0);
  }

  private toNumber(value: unknown): number {
    const numberValue = Number(value);
    return Number.isFinite(numberValue) ? numberValue : 0;
  }

}
