import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LogManagerService } from './log-manager.service';
import { SettingsService } from './settings.service';
import { FactorItem } from '../interfaces/factor-item/factor-item';
import { Observable, map } from 'rxjs';
import { HttpRequestResult } from '../models/http-request-result';
import { HttpRequestResultT } from '../models/http-request-result-t';

@Injectable({
  providedIn: 'root'
})
export class FactorItemService {

  public constructor(
    private _httpClient: HttpClient,
    private _settingsService: SettingsService,
    private _logManagerService: LogManagerService) {

    this._baseUrl = `${_settingsService.baseUrl}/FactorItem`;

  }

  private _baseUrl: string;
  
  public deleteByIdAsync(factorItem:FactorItem): Observable<HttpRequestResult> {

    let url = `${this._baseUrl}/DeleteByIdAsync?id=${factorItem.id}`;

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

  public getByIdAsync(id:string): Observable<HttpRequestResultT<FactorItem>> {
    let url = `${this._baseUrl}/GetByIdAsync?id=${id}`;

    let response = this._httpClient.get<HttpRequestResultT<FactorItem>>(url).pipe(map(result => {
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

  public insertAsync(factorItem:FactorItem): Observable<HttpRequestResultT<FactorItem>> {

    let url = `${this._baseUrl}/InsertAsync`;

    console.log(factorItem);

    let response = this._httpClient.post<HttpRequestResultT<FactorItem>>(url, factorItem,
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

  public updateAsync(factorItem:FactorItem): Observable<HttpRequestResultT<FactorItem>> {

    let url = `${this._baseUrl}/UpdateAsync`;

    let response = this._httpClient.post<HttpRequestResultT<FactorItem>>
      (url, factorItem, this._settingsService.httpOptions).pipe(map(result => {

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
