import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppLanguage, LanguageService } from '../../../../i18n/language.service';
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
    private _router: Router,
    public readonly languageService: LanguageService) {

    this.settings = _settingsService;

  }

  public ngOnInit(): void {
  }


  public onClickLogout() {
    this._settingsService.clearSessionData();
    this._router.navigate(['/login']);

  }


  public sideBarClose() {

    this.settings.isSideBarOpen = !this.settings.isSideBarOpen;

  }

  public setLanguage(language: AppLanguage): void {
    this.languageService.setLanguage(language);
  }

}
