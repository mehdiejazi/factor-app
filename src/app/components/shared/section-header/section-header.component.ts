import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SideMenuService } from '../../../services/side-menu.service';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.css']
})
export class SectionHeaderComponent implements OnInit, OnDestroy {
  public icon: string = '';
  public title: string = '';

  private _routerSub?: Subscription;

  public constructor(
    private _router: Router,
    private _cdr: ChangeDetectorRef,
    private _sideMenuService: SideMenuService
  ) { }

  public ngOnInit(): void {
    this.syncFromRoute();
    this._routerSub = this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.syncFromRoute();
      }
    });
  }

  public ngOnDestroy(): void {
    if (this._routerSub) {
      this._routerSub.unsubscribe();
    }
  }

  private syncFromRoute(): void {
    const url = this.normalizeUrl(this._router.url);
    const menu = this._sideMenuService.findByUrl(url);
    if (!menu) {
      return;
    }

    if (menu.Icon && menu.Text) {
      this.icon = menu.Icon;
      this.title = menu.Text;
      this._cdr.markForCheck();
    }
  }
  private normalizeUrl(url: string): string {
    const noQuery = url.split('?')[0];
    return noQuery.split('#')[0];
  }
}


