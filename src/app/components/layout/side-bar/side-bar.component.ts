import { Component, HostListener, OnInit } from '@angular/core';
import { SettingsService } from '../../../services/settings.service';
import { SiteMapService } from '../../../services/site-map.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  public isMenuCollapsed: Boolean = false;
  public screenWidth: number;
  public siteMap: SiteMapService;
  public settings: SettingsService;

  public constructor(
    private _settingsService: SettingsService,
    private _siteMapService: SiteMapService) {
    this.settings = _settingsService;
    this.siteMap = _siteMapService;
  }

  public ngOnInit(): void {
  }

}
