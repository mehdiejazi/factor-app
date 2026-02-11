import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SettingsService } from './settings.service';
import { LoginRequest } from '../models/auth/login-request';
import { Observable, map } from 'rxjs';
import { HttpRequestResultT } from '../models/http-request-result-t';
import { LoginResponse } from '../models/auth/login-response';
import { MobileVerificationRequest } from '../models/auth/mobile-verification-request';
import { NewTokenRequest } from '../models/auth/new-roken-request';
import { HttpRequestResult } from '../models/http-request-result';
import { NewTokenResponse } from '../models/auth/new-token-response';
import { LogManagerService } from './log-manager.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public constructor(
    private _httpClient: HttpClient,
    private _settingsService: SettingsService,
    private _logManagerService: LogManagerService) { }

  public loginAsync(request: LoginRequest): Observable<HttpRequestResultT<LoginResponse>> {

    let url = `${this._settingsService.baseUrl}/Auth/LoginAsync`;

    let response = this._httpClient.post<HttpRequestResultT<LoginResponse>>
      (url, request, this._settingsService.httpOptionsForm).pipe(map(result => {

        if (result.data.user.avatar?.url)
          result.data.user.avatar.url = `${this._settingsService.baseUrl}${result.data.user.avatar.url}`;

        for (let i = 0; i < result.errorMessages.length; i++) {

          this._logManagerService.logError(result.errorMessages[i])

        }

        if (result.warningMessages !== undefined)
          for (let i = 0; i < result.warningMessages.length; i++) {

            this._logManagerService.logWarning(result.warningMessages[i])

          }

        if (result.informationMessages !== undefined)
          for (let i = 0; i < result.informationMessages.length; i++) {

            this._logManagerService.logInformation(result.informationMessages[i])

          }

        return result;

      })
      );

    return response;

  }

  public logoutAsync(userId: string): Observable<HttpRequestResult> {

    let url = `${this._settingsService.baseUrl}/Auth/LogoutAsync`;

    let response = this._httpClient.get<HttpRequestResult>
      (url, this._settingsService.httpOptionsForm).pipe(
        map(result => {

          if (result.errorMessages !== undefined)
            for (let i = 0; i < result.errorMessages.length; i++) {

              this._logManagerService.logError(result.errorMessages[i])

            }

          if (result.warningMessages !== undefined)
            for (let i = 0; i < result.warningMessages.length; i++) {

              this._logManagerService.logWarning(result.warningMessages[i])

            }

          if (result.informationMessages !== undefined)
            for (let i = 0; i < result.informationMessages.length; i++) {

              this._logManagerService.logInformation(result.informationMessages[i])

            }

          return result;

        })
      );

    return response;

  }

  public mobileVerificationAsync(request: MobileVerificationRequest): Observable<HttpRequestResult> {

    let url = `${this._settingsService.baseUrl}/Auth/MobileVerificationAsync`;

    let response = this._httpClient.post<HttpRequestResult>
      (url, request, this._settingsService.httpOptionsForm).pipe(
        map(result => {

          if (result.errorMessages !== undefined)
            for (let i = 0; i < result.errorMessages.length; i++) {

              this._logManagerService.logError(result.errorMessages[i])

            }

          if (result.warningMessages !== undefined)
            for (let i = 0; i < result.warningMessages.length; i++) {

              this._logManagerService.logWarning(result.warningMessages[i])

            }

          if (result.informationMessages !== undefined)
            for (let i = 0; i < result.informationMessages.length; i++) {

              this._logManagerService.logInformation(result.informationMessages[i])

            }

          return result;

        })
      );

    return response;

  }

  public checkMobileVerificationAsync(userName: string, code: string): Observable<HttpRequestResultT<LoginResponse>> {

    let url = `${this._settingsService.baseUrl}/Auth/CheckMobileVerificationAsync?userName=${userName}&code=${code}`;

    let response = this._httpClient.get<HttpRequestResultT<LoginResponse>>
      (url, this._settingsService.httpOptionsForm).pipe(
        map(result => {

          if (result.errorMessages !== undefined)
            for (let i = 0; i < result.errorMessages.length; i++) {

              this._logManagerService.logError(result.errorMessages[i])

            }

          if (result.warningMessages !== undefined)
            for (let i = 0; i < result.warningMessages.length; i++) {

              this._logManagerService.logWarning(result.warningMessages[i])

            }

          if (result.informationMessages !== undefined)
            for (let i = 0; i < result.informationMessages.length; i++) {

              this._logManagerService.logInformation(result.informationMessages[i])

            }

          return result;

        })
      );

    return response;

  }

  public generateNewTokenAsync(request: NewTokenRequest): Observable<HttpRequestResultT<NewTokenResponse>> {

    let url = `${this._settingsService.baseUrl}/Auth/GenerateNewTokenAsync`;

    let response = this._httpClient.post<HttpRequestResultT<NewTokenResponse>>
      (url, request, this._settingsService.httpOptionsForm).pipe(
        map(result => {

          if (result.errorMessages !== undefined)
            for (let i = 0; i < result.errorMessages.length; i++) {

              this._logManagerService.logError(result.errorMessages[i])

            }

          if (result.warningMessages !== undefined)
            for (let i = 0; i < result.warningMessages.length; i++) {

              this._logManagerService.logWarning(result.warningMessages[i])

            }

          if (result.informationMessages !== undefined)
            for (let i = 0; i < result.informationMessages.length; i++) {

              this._logManagerService.logInformation(result.informationMessages[i])

            }

          return result;

        })
      );

    return response;

  }
}
