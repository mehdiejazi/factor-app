import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SettingsService } from './settings.service';
import { LogManagerService } from './log-manager.service';
import { Observable, map } from 'rxjs';
import { HttpRequestResultT } from '../models/http-request-result-t';
import * as Interfaces from '../interfaces/image-asset/image-asset';
import { ImageAssetRequest } from '../models/image-asset/Image-asset-request';

@Injectable({
  providedIn: 'root'
})
export class ImageAssetService {

  public constructor(
    private _httpClient: HttpClient,
    private _settingsService: SettingsService,
    private _logManagerService: LogManagerService) { }

  private toFormData(o: object) {
    return Object.entries(o).reduce((d, e) => (d.append(...e), d), new FormData())
  }
  
  public deleteByIdAsync(id: string): Observable<HttpRequestResultT<Interfaces.ImageAsset>> {
    let url = `${this._settingsService.baseUrl}/ImageAsset/DeleteByIdAsync?id=${id}`

    let response = this._httpClient.get<HttpRequestResultT<Interfaces.ImageAsset>>(url).pipe(
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
  public getAsync(): Observable<HttpRequestResultT<Interfaces.ImageAsset[]>> {
    let url = `${this._settingsService.baseUrl}/ImageAsset/GetAsync`

    console.log(url);

    let response = this._httpClient.get<HttpRequestResultT<Interfaces.ImageAsset[]>>(url).pipe(
      map(result => {

        if (result.isSuccessful) {
          result.data.forEach(img => {
            img.url = this._settingsService.baseUrl + img.url;
          });
        }

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
  public getDeletedAsync(): Observable<HttpRequestResultT<Interfaces.ImageAsset[]>> {
    let url = `${this._settingsService.baseUrl}/ImageAsset/GetDeletedAsync`

    let response = this._httpClient.get<HttpRequestResultT<Interfaces.ImageAsset[]>>(url).pipe(
      map(result => {

        if (result.isSuccessful) {
          result.data.forEach(img => {
            img.url = this._settingsService.baseUrl + img.url;
          });
        }

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
  public getNotDeletedAsync(): Observable<HttpRequestResultT<Interfaces.ImageAsset[]>> {
    let url = `${this._settingsService.baseUrl}/ImageAsset/GetNotDeletedAsync`

    let response = this._httpClient.get<HttpRequestResultT<Interfaces.ImageAsset[]>>(url).pipe(
      map(result => {

        if (result.isSuccessful) {
          result.data.forEach(img => {
            img.url = this._settingsService.baseUrl + img.url;
          
          });
        }

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
  public getByIdAsync(id: string): Observable<HttpRequestResultT<Interfaces.ImageAsset>> {
    let url = `${this._settingsService.baseUrl}/ImageAsset/GetByIdAsync?id=${id}`

    let response = this._httpClient.get<HttpRequestResultT<Interfaces.ImageAsset>>(url).pipe(
      map(result => {

        if (result.isSuccessful) {
          result.data.url = this._settingsService.baseUrl + result.data.url;
        };


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
  public insertAsync(request: ImageAssetRequest): Observable<HttpRequestResultT<Interfaces.ImageAsset>> {

    let url = `${this._settingsService.baseUrl}/ImageAsset/InsertAsync?fileName=${request.fileName}`;

    const formData = this.toFormData(request);

    let response = this._httpClient.post<HttpRequestResultT<Interfaces.ImageAsset>>
      (url, formData, this._settingsService.httpOptionsForm).pipe(
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
