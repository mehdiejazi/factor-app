
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { Store } from '../../../../models/store/store';
import { ImageAssetSelectModalComponent } from '../../image-asset-section/image-asset-select-modal/image-asset-select-modal.component';
import { SettingsService } from '../../../../services/settings.service';

@Component({
  selector: 'app-store-form-modal',
  templateUrl: './store-form-modal.component.html',
  styleUrls: ['./store-form-modal.component.css']
})
export class StoreFormModalComponent implements OnInit {

  public active: boolean = false;
  public title: string;
  public onClose: Subject<boolean>;
  public error: Error;
  public store: Store;

  public constructor(
    private _bsModalRef: BsModalRef,
    private _bsModalService: BsModalService,
    private _settingsService:SettingsService) { }

  public ngOnInit(): void {

    this.onClose = new Subject();

  }

  public selectImage() {

    const modal = this._bsModalService.show(ImageAssetSelectModalComponent,
      { class: 'modal-xl modal-dialog-centered modal-dialog' });
    (<ImageAssetSelectModalComponent>modal.content).showConfirmationModal(this._settingsService.getUser().id);
    (<ImageAssetSelectModalComponent>modal.content).onClose.subscribe(result => {

      if (result === true) {

        this.store.logo = modal.content.selectedImageAsset;
        this.store.logoId = modal.content.selectedImageAsset.id;

      } else if (result === false) {

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


  public isValidURL(str: string) {

    if (str == '') return true;

    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

    return !!pattern.test(str);
    
  }

  public isValidForm(): boolean {

    var result = true;

    if (!this.store.name) {

      result = false;

    }

    if (!this.store.storeEnglishName) {

      result = false;

    }

    if (this.isValidURL(this.store.url)) {

      result = false;

    }

    return result;
  }

  public showConfirmationModal(store: Store): void {

    this.store = store;

    if (store?.id)

      this.title = 'ویرایش';

    else {

      this.title = 'گزینه جدید';

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
