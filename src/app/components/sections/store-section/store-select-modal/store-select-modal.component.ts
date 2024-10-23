import { Component, OnInit } from '@angular/core';
import { Store } from '../../../../interfaces/store/store';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { StoreService } from '../../../../services/store.service';
import { SettingsService } from '../../../../services/settings.service';

@Component({
  selector: 'app-store-select-modal',
  templateUrl: './store-select-modal.component.html',
  styleUrl: './store-select-modal.component.css'
})
export class StoreSelectModalComponent implements OnInit {

  public active: boolean = false;
  public title: string;
  public onClose: Subject<boolean>;
  public error: Error;
  public stores: Store[];
  public storesFilter: Store[];
  public selectedStore: Store;

  public txtSearch: string;

  public constructor(private _bsModalRef: BsModalRef,
    private _storeService: StoreService,
    private _settingsService: SettingsService) { }

  public ngOnInit(): void {

    this.onClose = new Subject();
  }


  public fillStores() {

    this._storeService.getByOwnerAsync()
      .subscribe(
        result => {

          this.stores = result.data;

          this.stores.forEach(b => {

            if (b.logo !== null) {

              b.logo.url == this._settingsService.baseUrl + b.logo.url;

            }

            this.storesFilter = this.stores;

          });

        },
        error => {

          this.error = error;
          console.error(error);

        }
      );
  }


  public showConfirmationModal(): void {

    this.fillStores();
    this.title = 'انتخاب فروشگاه';
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

    this.storesFilter = this.stores
      .filter(bsh => bsh.name.includes(newValue));

  }

  public unSelectCards() {

    var cards = document.querySelectorAll(".card-items");
    cards.forEach(element => {
      element.classList.remove('bg-primary');
    });

  }

  public onCardClick(e: any, store: Store): void {

    this.unSelectCards();

    const clickedElement = e.target;

    if (clickedElement.closest('.card-items')) {
      clickedElement.closest('.card-items').classList.add('bg-primary');
    }

    this.selectedStore = store;

  }

  public onConfirm() {

    this.active = false;
    this.onClose.next(true);
    this._bsModalRef.hide();

  }
}
