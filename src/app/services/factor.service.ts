import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SettingsService } from './settings.service';
import { LogManagerService } from './log-manager.service';
import { Factor } from '../interfaces/factor/factor';
import { Observable, map } from 'rxjs';
import { HttpRequestResultT } from '../models/http-request-result-t';
import { HttpRequestResult } from '../models/http-request-result';

export interface FactorSaleHourly {
  hour: number;
  count: number;
  totalPrice: number;
}

export interface FactorSaleWeekDaily {
  dayOfWeek: number;
  count: number;
  totalPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class FactorService {
  private _baseUrl: string;

  public constructor(
    private _httpClient: HttpClient,
    private _settingsService: SettingsService,
    private _logManagerService: LogManagerService) {
    this._baseUrl = `${_settingsService.baseUrl}/Factor`;
  }

  public insertAsync(factor: Factor): Observable<HttpRequestResultT<Factor>> {
    return this._httpClient.post<HttpRequestResultT<Factor>>(`${this._baseUrl}/InsertAsync`, factor, this._settingsService.httpOptionsForm)
      .pipe(map(result => this.handleResult(result)));
  }

  public updateAsync(factor: Factor): Observable<HttpRequestResultT<Factor>> {
    return this._httpClient.post<HttpRequestResultT<Factor>>(`${this._baseUrl}/UpdateAsync`, factor, this._settingsService.httpOptions)
      .pipe(map(result => this.handleResult(result)));
  }

  public deleteByIdAsync(factor: Factor): Observable<HttpRequestResult> {
    return this._httpClient.get<HttpRequestResult>(`${this._baseUrl}/DeleteByIdAsync?id=${factor.id}`)
      .pipe(map(result => this.handleResult(result)));
  }

  public getByIdAsync(id: string): Observable<HttpRequestResultT<Factor>> {
    return this._httpClient.get<HttpRequestResultT<Factor>>(`${this._baseUrl}/GetByIdAsync?id=${id}`)
      .pipe(map(result => this.handleResult(result)));
  }

  public getByStoreIdAsync(storeId: string): Observable<HttpRequestResultT<Factor[]>> {
    return this._httpClient.get<HttpRequestResultT<Factor[]>>(`${this._baseUrl}/GetByStoreIdAsync?storeId=${storeId}`)
      .pipe(map(result => this.handleResult(result)));
  }

  public getFactorWithItemsByIdAsync(id: string): Observable<HttpRequestResultT<Factor>> {
    return this._httpClient.get<HttpRequestResultT<Factor>>(`${this._baseUrl}/GetFactorWithItemsByIdAsync?id=${id}`)
      .pipe(map(result => this.handleResult(result)));
  }

  public getHourlyFactorSaleAsync(storeId: string, dtFrom: string, dtTo: string): Observable<HttpRequestResultT<FactorSaleHourly[]>> {
    const url = `${this._baseUrl}/GetHourlyFactorSaleAsync?storeId=${storeId}&dtFrom=${encodeURIComponent(dtFrom)}&dtTo=${encodeURIComponent(dtTo)}`;
    return this._httpClient.get<HttpRequestResultT<FactorSaleHourly[]>>(url)
      .pipe(map(result => this.handleResult(result)));
  }

  public getWeekDailyFactorSaleAsync(storeId: string, dtFrom: string, dtTo: string): Observable<HttpRequestResultT<FactorSaleWeekDaily[]>> {
    const url = `${this._baseUrl}/GetWeekDailyFactorSaleAsync?storeId=${storeId}&dtFrom=${encodeURIComponent(dtFrom)}&dtTo=${encodeURIComponent(dtTo)}`;
    return this._httpClient.get<HttpRequestResultT<FactorSaleWeekDaily[]>>(url)
      .pipe(map(result => this.handleResult(result)));
  }

  private handleResult<T extends HttpRequestResult | HttpRequestResultT<any>>(result: T): T {
    if (result.errorMessages !== undefined) {
      for (const error of result.errorMessages) {
        this._logManagerService.logError(error);
      }
    }

    if (result.warningMessages !== undefined) {
      for (const warning of result.warningMessages) {
        this._logManagerService.logWarning(warning);
      }
    }

    if (result.informationMessages !== undefined) {
      for (const info of result.informationMessages) {
        this._logManagerService.logInformation(info);
      }
    }

    return result;
  }
}
