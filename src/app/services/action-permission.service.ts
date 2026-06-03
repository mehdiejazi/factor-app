import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ActionPermission } from '../interfaces/action-permission/action-permission';
import { HttpRequestResultT } from '../models/http-request-result-t';
import { LogManagerService } from './log-manager.service';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class ActionPermissionService {
  public constructor(
    private _httpClient: HttpClient,
    private _settingsService: SettingsService,
    private _logManagerService: LogManagerService
  ) {
    this._baseUrl = `${_settingsService.baseUrl}/ActionPermission`;
  }

  private _baseUrl: string;

  public getAllAsync(): Observable<HttpRequestResultT<ActionPermission[]>> {
    const url = `${this._baseUrl}/GetAllAsync`;
    return this._httpClient.get<HttpRequestResultT<ActionPermission[]>>(url).pipe(
      map(result => {
        this.logMessages(result);
        return result;
      })
    );
  }

  public getByIdAsync(id: string): Observable<HttpRequestResultT<ActionPermission>> {
    const url = `${this._baseUrl}/GetByIdAsync?id=${id}`;
    return this._httpClient.get<HttpRequestResultT<ActionPermission>>(url).pipe(
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
