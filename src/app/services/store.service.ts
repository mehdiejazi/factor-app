import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SettingsService } from './settings.service';
import { LogManagerService } from './log-manager.service';
import { Store } from '../interfaces/store/store';
import { Observable, map } from 'rxjs';
import { HttpRequestResultT } from '../models/http-request-result-t';
import { HttpRequestResult } from '../models/http-request-result';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  public constructor(
    private _httpClient: HttpClient,
    private _settingsService: SettingsService,
    private _logManagerService: LogManagerService) {

    this._baseUrl = `${_settingsService.baseUrl}/Store`;

  }

  private _baseUrl: string;

  public insertAsync(store: Store): Observable<HttpRequestResultT<Store>> {

    let url = `${this._baseUrl}/InsertAsync`;


    let response = this._httpClient.post<HttpRequestResultT<Store>>(url, store,
      this._settingsService.httpOptionsForm).pipe(map(result => {


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

  public updateAsync(store: Store): Observable<HttpRequestResultT<Store>> {

    let url = `${this._baseUrl}/UpdateAsync`;

    let response = this._httpClient.post<HttpRequestResultT<Store>>
      (url, store, this._settingsService.httpOptions).pipe(map(result => {

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

  public deleteByIdAsync(store: Store): Observable<HttpRequestResult> {

    let url = `${this._baseUrl}/DeleteByIdAsync?id=${store.id}`;

    let response = this._httpClient.get<HttpRequestResult>(url).pipe(map(result => {
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

    }));

    return response;
  }

  public getByIdAsync(id: string): Observable<HttpRequestResultT<Store>> {
    let url = `${this._baseUrl}/GetByIdAsync?id=${id}`;

    let response = this._httpClient.get<HttpRequestResultT<Store>>(url).pipe(map(result => {
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

    }));

    return response;
  }

  public getByOwnerAsync(): Observable<HttpRequestResultT<Store[]>> {
    let url = `${this._baseUrl}/GetByOwnerAsync`;


    let response = this._httpClient.get<HttpRequestResultT<Store[]>>(url).pipe(map(result => {

      result.data.forEach(store => {
        if (store.logo?.url)
          store.logo.url = `${this._settingsService.baseUrl}${store.logo.url}`
      });

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

  public getByStoreEnglishNameAsync(storeEnglishName: string): Observable<HttpRequestResultT<Store>> {
    let url = `${this._baseUrl}/GetByStoreEnglishNameAsync?storeEnglishName=${storeEnglishName}`;

    let response = this._httpClient.get<HttpRequestResultT<Store>>(url).pipe(map(result => {
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

    }));

    return response;
  }

}
