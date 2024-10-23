import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SettingsService } from './settings.service';
import { LogManagerService } from './log-manager.service';
import { Observable, map } from 'rxjs';
import { HttpRequestResultT } from '../models/http-request-result-t';
import { Category } from '../interfaces/category/category';
import { HttpRequestResult } from '../models/http-request-result';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public constructor(
    private _httpClient: HttpClient,
    private _settingsService: SettingsService,
    private _logManagerService: LogManagerService) {

    this._baseUrl = `${_settingsService.baseUrl}/Category`;

  }

  private _baseUrl: string;

  public insertAsync(category:Category): Observable<HttpRequestResultT<Category>> {

    let url = `${this._baseUrl}/InsertAsync`;


    let response = this._httpClient.post<HttpRequestResultT<Category>>(url, category,
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

  public updateAsync(category:Category): Observable<HttpRequestResultT<Category>> {

    let url = `${this._baseUrl}/UpdateAsync`;

    let response = this._httpClient.post<HttpRequestResultT<Category>>
      (url, category, this._settingsService.httpOptions).pipe(map(result => {

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

  public deleteByIdAsync(category:Category): Observable<HttpRequestResult> {

    let url = `${this._baseUrl}/DeleteByIdAsync?id=${category.id}`;

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

  public getByIdAsync(id:string): Observable<HttpRequestResultT<Category>> {
    let url = `${this._baseUrl}/GetByIdAsync?id=${id}`;

    let response = this._httpClient.get<HttpRequestResultT<Category>>(url).pipe(map(result => {
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

  public getByStoreIdAsync(storeId:string): Observable<HttpRequestResultT<Category[]>> {

    let url = `${this._baseUrl}/GetByStoreIdAsync?storeId=${storeId}`;

    let response = this._httpClient.get<HttpRequestResultT<Category[]>>(url).pipe(map(result => {
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