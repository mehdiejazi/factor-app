import { Component, HostListener, OnInit } from '@angular/core';
import { SettingsService } from '../../../services/settings.service';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  public constructor(private _settingsService: SettingsService) {

    this.settingsService = _settingsService;

   }

  public ngOnInit(): void {
  }

  public screenWidth: number;
  public settingsService:SettingsService;
  @HostListener('window:resize', ['$event'])
  public onResize(event: any) {

    this.screenWidth = event.target.innerWidth;

    if (this.screenWidth <= 768) {

      this._settingsService.isMobileSize = true;
      this._settingsService.isSideBarOpen = false;

    } else {

      this._settingsService.isMobileSize = false;
      this._settingsService.isSideBarOpen = true;
      
    }
  }


}
