import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ImageAsset } from '../../../../interfaces/image-asset/image-asset';
import { ImageAssetService } from '../../../../services/image-asset.service';
import { LogManagerService } from '../../../../services/log-manager.service';
import { SettingsService } from '../../../../services/settings.service';
import { ImageAssetRequest } from '../../../../models/image-asset/Image-asset-request';

@Component({
  selector: 'app-image-asset-upload',
  templateUrl: './image-asset-upload.component.html',
  styleUrls: ['./image-asset-upload.component.css']
})
export class ImageAssetUploadComponent implements OnInit {

  @Output() fillGallery = new EventEmitter<void>();
  @ViewChild('fileUpload')
  fileUpload: ElementRef;

  public formSuccessful: boolean;

  public errorMessages: string[] = [];
  public warningMessages: string[] = [];
  public informationMessages: string[] = [];


  public error: Error;
  public imageData: ImageAsset;

  public constructor(
    private _imagesService: ImageAssetService,
    private _logManageService: LogManagerService,
    private _settingsService: SettingsService) {
    this.shortLink = "";
    this.loading = false;
  }

  public shortLink: string;
  public loading: boolean; // Flag variable
  public file: File;

  public ngOnInit(): void {

  }

  public onChange(event: any) {

    this.file = event.target.files[0];

  }

  // OnClick of button Upload
  public onUpload() {

    if (this.file === undefined)
      return;

    if (this.file.name === '')
      return;

    this.errorMessages = [];
    this.warningMessages = [];
    this.informationMessages = [];

    this.formSuccessful = false;

    let req: ImageAssetRequest;
    req = new ImageAssetRequest();

    req.fileName = this.file.name;
    req.imageDataFile = this.file;

    this._imagesService.insertAsync(req).subscribe(
      result => {


        if (result.isSuccessful) {

          this.imageData = result.data;
          this.refreshGallery();
          this.fileUpload.nativeElement.value = '';
          this.file = null;
          this.formSuccessful = true;

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
        console.error(error?.message);

      }
    );

  }

  public refreshGallery(): void {

    this.fillGallery.next();
  }

}
