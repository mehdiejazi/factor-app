import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

import * as Interfaces from '../../../interfaces/image-asset/image-asset';
import { ConfirmationModalComponent } from '../../modals/confirmation-modal/confirmation-modal.component';
import { ImageAssetService } from '../../../services/image-asset.service';
import { LogManagerService } from '../../../services/log-manager.service';
import { SettingsService } from '../../../services/settings.service';
import { GalleryModalComponent } from '../../modals/gallery-modal/gallery-modal.component';

@Component({
  selector: 'app-image-asset-section',
  templateUrl: './image-asset-section.component.html',
  styleUrls: ['./image-asset-section.component.css']
})
export class ImageAssetSectionComponent implements OnInit {

  public formSuccessful: boolean;

  public errorMessages: string[] = [];
  public warningMessages: string[] = [];
  public informationMessages: string[] = [];

  public imageAssets: Interfaces.ImageAsset[]
  public error: Error;

  public constructor(
    private _imagesService: ImageAssetService,
    private _logManageService: LogManagerService,
    private _bsModalService: BsModalService,
    private _settingsService: SettingsService
  ) { }

  public ngOnInit(): void {

    this.fillGallery();

  }

  public showGalleryModal() {

    const modal = this._bsModalService.show(GalleryModalComponent,
      { class: 'modal-xl modal-dialog-centered modal-dialog' });
    (<GalleryModalComponent>modal.content).showConfirmationModal(this._settingsService.tempUserId);

    (<GalleryModalComponent>modal.content).onClose.subscribe(result => {
      if (result === true) {

        // alert(modal.content?.selectedImageAssets.id);

      } else if (result === false) {

      }
    },
      error => {

        this.error = error;
        console.error(error);

      });

  }

  public fillGallery() {


    this._imagesService.getNotDeletedAsync()
      .subscribe(
        result => {

          if (result.isSuccessful) {
            
            this.imageAssets = result.data;

          }
          else {

            if (result.errorMessages)
              result.errorMessages.forEach(er => this.errorMessages.push(er));

            if (result.informationMessages)
              result.informationMessages.forEach(er => this.informationMessages.push(er));

            if (result.warningMessages)
              result.warningMessages.forEach(er => this.warningMessages.push(er));

          }
        },
        error => {

          this.error = error;
          console.error(error);

        }
      );
  }

  public onClickDelete(image: Interfaces.ImageAsset) {

    let strTitle = 'حذف';
    let strBody = 'آیا مایل به حذف این تصویر هستید؟';

    const modal = this._bsModalService.show(ConfirmationModalComponent);
    (<ConfirmationModalComponent>modal.content).showConfirmationModal(
      strTitle, strBody
    );

    (<ConfirmationModalComponent>modal.content).onClose.subscribe(result => {
      if (result === true) {

        this._imagesService.deleteByIdAsync(image.id).subscribe(
          result => {

            if (result.isSuccessful) {

              this.fillGallery();

            }
            else {

              if (result.errorMessages)
                result.errorMessages.forEach(er => this.errorMessages.push(er));

              if (result.informationMessages)
                result.informationMessages.forEach(er => this.informationMessages.push(er));

              if (result.warningMessages)
                result.warningMessages.forEach(er => this.warningMessages.push(er));

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

}
