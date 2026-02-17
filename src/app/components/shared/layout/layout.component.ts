import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SettingsService } from '../../../services/settings.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, OnDestroy {

  public screenWidth: number;
  public settingsService: SettingsService;
  public navReady: boolean = false;
  public routeReady: boolean = false;

  private _routerEventsSub: Subscription | null = null;

  public constructor(private _settingsService: SettingsService, private _router: Router) {
    this.settingsService = _settingsService;
  }

  public ngOnInit(): void {
    this.navReady = true;
    this.routeReady = true;
    this._routerEventsSub = this._router.events.subscribe((event: Event) => this.onRouteEvent(event));
  }

  public ngOnDestroy(): void {
    this._routerEventsSub?.unsubscribe();
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event: any): void {

    this.screenWidth = event.target.innerWidth;

    if (this.screenWidth <= 768) {

      this._settingsService.isMobileSize = true;
      this._settingsService.isSideBarOpen = false;

    } else {

      this._settingsService.isMobileSize = false;
      this._settingsService.isSideBarOpen = true;

    }
  }

  private onRouteEvent(event: Event): void {
    if (event instanceof NavigationStart) {
      this.routeReady = false;
      return;
    }

    if (
      event instanceof NavigationEnd ||
      event instanceof NavigationCancel ||
      event instanceof NavigationError
    ) {
      setTimeout(() => this.routeReady = true, 90);
    }
  }
}
