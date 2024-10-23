import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../../../../models/user/user';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserService } from '../../../../services/user.service';
import { Store } from '../../../../interfaces/store/store';
import { ConfirmationModalComponent } from '../../../modals/confirmation-modal/confirmation-modal.component';
import { StoreSelectModalComponent } from '../../store-section/store-select-modal/store-select-modal.component';
import { ImageAssetSelectModalComponent } from '../../image-asset-section/image-asset-select-modal/image-asset-select-modal.component';
import { SettingsService } from '../../../../services/settings.service';

@Component({
  selector: 'app-user-form-modal',
  templateUrl: './user-form-modal.component.html',
  styleUrl: './user-form-modal.component.css'
})
export class UserFormModalComponent {

public selectAvatar() {

  const modal = this._bsModalService.show(ImageAssetSelectModalComponent,
    { class: 'modal-xl modal-dialog-centered modal-dialog' });
  
  (<ImageAssetSelectModalComponent>modal.content).showConfirmationModal(this._settingsService.getUser().id);
  (<ImageAssetSelectModalComponent>modal.content).onClose.subscribe(result => {

    if (result === true) {

      this.user.avatar = modal.content.selectedImageAsset;
      this.user.avatarId = modal.content.selectedImageAsset.id;
      
    } else if (result === false) {

    }

  });
}

  public active: boolean = false;
  public title: string;
  public onClose: Subject<boolean>;
  public error: Error;
  public user: User;

  public constructor(
    private _bsModalRef: BsModalRef,
    private _bsModalService: BsModalService,
    private _userService: UserService,
    private _settingsService:SettingsService) { }

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

    // if (!this.user.description) {

    //   result = false;

    // }

    return result;
  }

  public showConfirmationModal(user: User): void {

    this.user = user;

    if (user?.id)

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

  public onClickAddStore() {

    const modal = this._bsModalService.show(StoreSelectModalComponent,
      { class: 'modal-xl modal-dialog-centered modal-dialog' });

    (<StoreSelectModalComponent>modal.content).showConfirmationModal();
    (<StoreSelectModalComponent>modal.content).onClose.subscribe(result => {

      if (result == true) {

        let selectedStore = modal.content.selectedStore;
        if (this.user.stores.findIndex(s => s.id != selectedStore.id) >-1) //not exists
          this.user.stores.push(selectedStore);

      }

    });

  }

  public onCloseStore(store: Store) {


    let strTitle = 'حذف';
    let strBody = 'آیا مایل به حذف هستید؟'

    const modal = this._bsModalService.show(ConfirmationModalComponent,
      { class: 'modal-dialog-centered modal-dialog' });

    (<ConfirmationModalComponent>modal.content).showConfirmationModal(
      strTitle, strBody
    );

    (<ConfirmationModalComponent>modal.content).onClose.subscribe(result => {
      if (result == true) {
        var index = this.user.stores.indexOf(store);
        if (index > -1)
          this.user.stores.splice(index, 1);
      }
    });



  }

}
