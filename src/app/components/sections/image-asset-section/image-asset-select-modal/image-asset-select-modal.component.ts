import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { ImageAsset } from '../../../../interfaces/image-asset/image-asset';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ImageAssetService } from '../../../../services/image-asset.service';
import { SettingsService } from '../../../../services/settings.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-image-asset-select-modal',
  templateUrl: './image-asset-select-modal.component.html',
  styleUrl: './image-asset-select-modal.component.css'
})
export class ImageAssetSelectModalComponent {
  public currentPage: number = 1;
  public itemsPerPage: number = 12;

  public active: boolean = false;
  public title: string;
  public onClose: Subject<boolean>;
  public userId: string;
  public error: Error;
  public imageAssets: ImageAsset[];
  public selectedImageAsset: ImageAsset;

  public constructor(
    private _bsModalRef: BsModalRef,
    private _imagesService: ImageAssetService,
    private _settingsService: SettingsService,
    private _breakpointObserver: BreakpointObserver
  ) {
  }

  public fillGallery() {

    this._imagesService.getAsync().subscribe(
      result => {

        this.imageAssets = result.data;

      },
      error => {

        this.error = error;
        console.error(error);

      }
    );

  }

  public ngOnInit(): void {

    this.onClose = new Subject();

    this._breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).subscribe(state => {
      if (state.matches) {
        this.itemsPerPage = 4;
      } else {
        this.itemsPerPage = 12;
      }
      // this.showPagination = !state.matches;
    });
  }

  public unSelectCards() {

    var cards = document.querySelectorAll(".card-items");
    cards.forEach(element => {
      element.classList.remove('bg-primary');
    });

  }

  public onCardClick(e: any, image: ImageAsset): void {

    this.unSelectCards();
    (e.target as HTMLDivElement).parentElement.classList.add('bg-primary');
    this.selectedImageAsset = image;

  }

  public showConfirmationModal(userId: string): void {

    this.userId = userId;
    this.fillGallery();
    this.title = 'گالری تصاویر';
    this.active = true;

  }

  public onConfirm(): void {

    if (this.selectedImageAsset === undefined)
      return;

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