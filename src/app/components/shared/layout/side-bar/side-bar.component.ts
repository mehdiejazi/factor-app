import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SettingsService } from '../../../../services/settings.service';
import { SideMenuItem, SideMenuService } from '../../../../services/side-menu.service';
import { Store } from '../../../../interfaces/store/store';
import { StoreSelectModalComponent } from '../../../sections/store-section/store-select-modal/store-select-modal.component';


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  public isMenuCollapsed: Boolean = false;
  public screenWidth: number;
  public settings: SettingsService;
  public menuItems: SideMenuItem[];
  public storeName: string;
  public storeLogoUrl: string;

  public constructor(
    private _settingsService: SettingsService,
    private _sideMenuService: SideMenuService,
    private _bsModalService: BsModalService) {
    this.settings = _settingsService;
    this.menuItems = _sideMenuService.items;
  }

  public ngOnInit(): void {
    this.syncSelectedStore();
  }

  public onClickSelectStore(): void {

    const modal = this._bsModalService.show(StoreSelectModalComponent,
      { class: 'modal-xl modal-dialog-centered modal-dialog' });

    (<StoreSelectModalComponent>modal.content).showConfirmationModal();
    (<StoreSelectModalComponent>modal.content).onClose.subscribe(result => {

      if (result !== true) {
        return;
      }

      const selectedStore: Store = modal.content.selectedStore;
      this.settings.setStore(selectedStore);
      this.syncSelectedStore();
      window.location.reload();

    });
  }

  private syncSelectedStore(): void {
    const currentStore: Store = this.settings.getStore();
    this.storeName = currentStore?.name?.trim()
      ? currentStore.name
      : 'انتخاب فروشگاه';
    this.storeLogoUrl = this.normalizeLogoUrl(currentStore?.logo?.url);
  }

  private normalizeLogoUrl(url: string | null | undefined): string {
    if (!url) {
      return '';
    }

    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }

    return `${this.settings.baseUrl}${url}`;
  }

}
