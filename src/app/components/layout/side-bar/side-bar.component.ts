import { Component, HostListener, OnInit } from '@angular/core';
import { SettingsService } from '../../../services/settings.service';
import { SideMenuService, SideMenuItem } from '../../../services/side-menu.service';

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

  public constructor(
    private _settingsService: SettingsService,
    private _sideMenuService: SideMenuService) {
    this.settings = _settingsService;
    this.menuItems = _sideMenuService.items;
  }

  public ngOnInit(): void {
  }

}
