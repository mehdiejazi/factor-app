import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SettingsService } from '../services/settings.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private _router: Router,
        private _settingsService: SettingsService,
        // private _siteMapService: SiteMapService
    ) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        if (this._settingsService.isAuthenticated()) {

            let menuRoute = state.url.split('/')[1];

            return true;

            // if (this._settingsService.getUser().role == 1 ||
            //     this._settingsService.getUser().role == 99) //admin or programmer
            // {
            //     console.log(menuRoute);
            //     // if (this._siteMapService.adminRoutes.includes(menuRoute))
            //     //     return true;
            //     // else {
            //     //     this._router.navigate(['/error403']);
            //     //     return false;
            //     // }

            //     return true;
            // }
            // else
            //     return false;

        }

        this._router.navigate(['/login'], { queryParams: { returnUrl: btoa(state.url) } });
        return false;

    }
}