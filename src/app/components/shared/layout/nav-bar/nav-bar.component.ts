import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

}
