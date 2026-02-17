import { Component, OnInit } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SettingsService } from '../../../../services/settings.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})

export class NavBarComponent implements OnInit {

  public settings: SettingsService;
  public error: Error;

  public constructor(
    private _settingsService: SettingsService,
    private _bsModalService: BsModalService,
    private _router:Router) {

    this.settings = _settingsService;

  }

  public ngOnInit(): void {
  }


  public onClickLogout() {

    // this._settingsService.setUser(null);
    // this._settingsService.setToken('');
    // this._settingsService.setRefreshToken('');
    localStorage.clear();
    this._router.navigate(['/login']);

  }


  public sideBarClose() {

    this.settings.isSideBarOpen = !this.settings.isSideBarOpen;

  }

  public selectStore(){

    const modal = this._bsModalService.show(StoreSelectModalComponent,
      { class: 'modal-xl modal-dialog-centered modal-dialog' });

    (<StoreSelectModalComponent>modal.content).showConfirmationModal();
    (<StoreSelectModalComponent>modal.content).onClose.subscribe(result => {

      if (result == true) {

        let selectedStore = modal.content.selectedStore;
        this.settings.setStore(selectedStore);

        window.location.reload();

      }

    });

  }

}
