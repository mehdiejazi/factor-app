import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpErrorResponse, HttpUserEvent, HttpEvent } from '@angular/common/http';
import { Observable, throwError as observableThrowError, BehaviorSubject, of, throwError } from 'rxjs';
import { catchError, windowToggle, switchMap, finalize, filter, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { SettingsService } from '../services/settings.service';
import { NewTokenRequest } from '../models/auth/new-roken-request';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    isRefreshingToken: boolean = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    public constructor(
        private _authService: AuthService,
        private _settingsService: SettingsService,
        private _router: Router) { }

    public addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        if (token == 'null' || token == null || token == '') return req.clone();
        return req.clone({ setHeaders: { Authorization: 'Bearer ' + token } })
    }

    //HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>
    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {

        var res = next.handle(this.addToken(req, this._settingsService.getToken())).pipe(
            // catchError((error: HttpErrorResponse) => {
            //     alert(error.status);
            //     if (error.status === 400) {
            //       return of(this.handle400Error(error));
            //     } else if (error.status === 401) {
            //       return of(this.handle401Error(req, next));
            //     } else {
            //       return throwError(error);
            //     }
            //   })

            catchError(err => {
                if (err instanceof HttpErrorResponse) {

                    // alert((<HttpErrorResponse>err).status);
                    switch ((<HttpErrorResponse>err).status) {
                        case 400:
                            return of(this.handle400Error(err));
                        case 401:
                            return of(this.handle401Error(req, next)); //expierd
                        default:
                            return observableThrowError(err);
                    }
                } else {
                    return observableThrowError(err);
                }
            })
        );

        return res;
    }

    // public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     alert(1);
    //     return next.handle(req).pipe(
    //         catchError((error: HttpErrorResponse) => {
    //             const statusCode = error.status;
    //             // اینجا شما می‌توانید از statusCode استفاده کنید
    //             console.log(statusCode);
    //             alert(statusCode);
    //             // بر اساس کد خطا می‌توانید عملیات مناسب را انجام دهید
    //             if (statusCode === 400) {
    //                 // کد خطا 400
    //             } else if (statusCode === 401) {
    //                 // کد خطا 401
    //             } else {
    //                 // کد خطای دیگر
    //             }

    //             // برای ادامه پردازش، می‌توانید خطا را به صورت Observable خطا ارسال کنید
    //             return throwError(error);
    //         })
    //     );
    // }

    public handle400Error(error: HttpErrorResponse) {
        if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
            return this.logoutUser();
        }

        return observableThrowError(error);
    }


    public handle401Error(req: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshingToken) {

            // alert(this.isRefreshingToken);
            this.isRefreshingToken = true;
            this.tokenSubject.next(null);

            var newTokenRequest = new NewTokenRequest();

            newTokenRequest.refreshToken = this._settingsService.getRefreshToken();
            newTokenRequest.userId = this._settingsService.getUser().id;

            return this._authService.generateNewTokenAsync(newTokenRequest).subscribe(
                result => {

                    console.log("AAA==>" + JSON.stringify(result));

                    this.isRefreshingToken = false;

                    if (result.isSuccessful) {

                        this.tokenSubject.next(result.data.token);
                        this._settingsService.setToken(result.data.token);
                        this._settingsService.setRefreshToken(result.data.refreshToken);
                        return next.handle(req.clone({ setHeaders: { Authorization: 'Bearer ' + result.data.token } }));
                    }

                    return this.logoutUser();

                },
                error => {

                    this.isRefreshingToken = false;
                    return this.logoutUser();
                }
            );


        } else {
            return this.tokenSubject.pipe(
                filter(token => token != null),
                take(1),
                switchMap(token => {
                    return next.handle(req.clone({ setHeaders: { Authorization: 'Bearer ' + token } }));
                }));
        }
    }

    public logoutUser() {

        // this._settingsService.setRefreshToken("");
        // this._settingsService.setToken("");
        // this._settingsService.setUser(null);
        localStorage.clear();
        this._router.navigate(['/login']);

        return observableThrowError("");
    }
}
