import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SettingsService } from './settings.service';
import { LogManagerService } from './log-manager.service';
import { Observable, map } from 'rxjs';
import { HttpRequestResultT } from '../models/http-request-result-t';
import { Category } from '../interfaces/category/category';
import { HttpRequestResult } from '../models/http-request-result';

export interface CategorySaleTotalQuantity {
  category: Category;
  totalQuantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private _baseUrl: string;

  public constructor(
    private _httpClient: HttpClient,
    private _settingsService: SettingsService,
    private _logManagerService: LogManagerService) {
    this._baseUrl = `${_settingsService.baseUrl}/Category`;
  }

  public insertAsync(category: Category): Observable<HttpRequestResultT<Category>> {
    return this._httpClient.post<HttpRequestResultT<Category>>(`${this._baseUrl}/InsertAsync`, category, this._settingsService.httpOptionsForm)
      .pipe(map(result => this.handleResult(result)));
  }

  public updateAsync(category: Category): Observable<HttpRequestResultT<Category>> {
    return this._httpClient.post<HttpRequestResultT<Category>>(`${this._baseUrl}/UpdateAsync`, category, this._settingsService.httpOptions)
      .pipe(map(result => this.handleResult(result)));
  }

  public deleteByIdAsync(category: Category): Observable<HttpRequestResult> {
    return this._httpClient.get<HttpRequestResult>(`${this._baseUrl}/DeleteByIdAsync?id=${category.id}`)
      .pipe(map(result => this.handleResult(result)));
  }

  public getByIdAsync(id: string): Observable<HttpRequestResultT<Category>> {
    return this._httpClient.get<HttpRequestResultT<Category>>(`${this._baseUrl}/GetByIdAsync?id=${id}`)
      .pipe(map(result => this.handleResult(result)));
  }

  public getByStoreIdAsync(storeId: string): Observable<HttpRequestResultT<Category[]>> {
    return this._httpClient.get<HttpRequestResultT<Category[]>>(`${this._baseUrl}/GetByStoreIdAsync?storeId=${storeId}`)
      .pipe(map(result => this.handleResult(result)));
  }

  public getSaleTotalQuantityAsync(storeId: string, dtFrom: string, dtTo: string): Observable<HttpRequestResultT<CategorySaleTotalQuantity[]>> {
    const url = `${this._baseUrl}/GetSaleTotalQuantityAsync?storeId=${storeId}&dtFrom=${encodeURIComponent(dtFrom)}&dtTo=${encodeURIComponent(dtTo)}`;
    return this._httpClient.get<HttpRequestResultT<CategorySaleTotalQuantity[]>>(url)
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
