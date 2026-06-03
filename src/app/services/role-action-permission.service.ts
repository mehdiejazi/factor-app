import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RoleActionPermission } from '../interfaces/role-action-permission/role-action-permission';
import { HttpRequestResult } from '../models/http-request-result';
import { HttpRequestResultT } from '../models/http-request-result-t';
import { LogManagerService } from './log-manager.service';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class RoleActionPermissionService {
  public constructor(
    private _httpClient: HttpClient,
    private _settingsService: SettingsService,
    private _logManagerService: LogManagerService
  ) {
    this._baseUrl = `${_settingsService.baseUrl}/RoleActionPermission`;
  }

  private _baseUrl: string;

  public getAllAsync(): Observable<HttpRequestResultT<RoleActionPermission[]>> {
    const url = `${this._baseUrl}/GetAllAsync`;
    return this._httpClient.get<HttpRequestResultT<RoleActionPermission[]>>(url).pipe(
      map(result => {
        this.logMessages(result);
        return result;
      })
    );
  }

  public getByIdAsync(id: string): Observable<HttpRequestResultT<RoleActionPermission>> {
    const url = `${this._baseUrl}/GetByIdAsync?id=${id}`;
    return this._httpClient.get<HttpRequestResultT<RoleActionPermission>>(url).pipe(
      map(result => {
        this.logMessages(result);
        return result;
      })
    );
  }

  public insertAsync(viewModel: RoleActionPermission): Observable<HttpRequestResultT<RoleActionPermission>> {
    const url = `${this._baseUrl}/InsertAsync`;
    return this._httpClient
      .post<HttpRequestResultT<RoleActionPermission>>(url, viewModel, this._settingsService.httpOptionsForm)
      .pipe(
        map(result => {
          this.logMessages(result);
          return result;
        })
      );
  }

  public updateAsync(viewModel: RoleActionPermission): Observable<HttpRequestResultT<RoleActionPermission>> {
    const url = `${this._baseUrl}/UpdateAsync`;
    return this._httpClient.post<HttpRequestResultT<RoleActionPermission>>(url, viewModel, this._settingsService.httpOptions).pipe(
      map(result => {
        this.logMessages(result);
        return result;
      })
    );
  }

  public deleteByIdAsync(id: string): Observable<HttpRequestResult> {
    const url = `${this._baseUrl}/DeleteByIdAsync?id=${id}`;
    return this._httpClient.get<HttpRequestResult>(url).pipe(
      map(result => {
        this.logMessages(result);
        return result;
      })
    );
  }

  private logMessages(result: {
    errorMessages?: string[];
    warningMessages?: string[];
    informationMessages?: string[];
  }): void {
    if (result.errorMessages !== undefined) {
      for (let i = 0; i < result.errorMessages.length; i++) {
        this._logManagerService.logError(result.errorMessages[i]);
      }
    }

    if (result.warningMessages !== undefined) {
      for (let i = 0; i < result.warningMessages.length; i++) {
        this._logManagerService.logWarning(result.warningMessages[i]);
      }
    }

    if (result.informationMessages !== undefined) {
      for (let i = 0; i < result.informationMessages.length; i++) {
        this._logManagerService.logInformation(result.informationMessages[i]);
      }
    }
  }
}
