import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SettingsService } from './settings.service';
import { LogManagerService } from './log-manager.service';
import { Product } from '../interfaces/product/product';
import { Observable, map } from 'rxjs';
import { HttpRequestResultT } from '../models/http-request-result-t';
import { HttpRequestResult } from '../models/http-request-result';

export interface ProductSaleTotalQuantity {
  product: Product;
  totalQuantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _baseUrl: string;

  public constructor(
    private _httpClient: HttpClient,
    private _settingsService: SettingsService,
    private _logManagerService: LogManagerService) {
    this._baseUrl = `${_settingsService.baseUrl}/Product`;
  }

  public insertAsync(product: Product): Observable<HttpRequestResultT<Product>> {
    return this._httpClient.post<HttpRequestResultT<Product>>(`${this._baseUrl}/InsertAsync`, product, this._settingsService.httpOptionsForm)
      .pipe(map(result => this.handleResult(result)));
  }

  public updateAsync(product: Product): Observable<HttpRequestResultT<Product>> {
    return this._httpClient.post<HttpRequestResultT<Product>>(`${this._baseUrl}/UpdateAsync`, product, this._settingsService.httpOptions)
      .pipe(map(result => this.handleResult(result)));
  }

  public deleteByIdAsync(product: Product): Observable<HttpRequestResult> {
    return this._httpClient.get<HttpRequestResult>(`${this._baseUrl}/DeleteByIdAsync?id=${product.id}`)
      .pipe(map(result => this.handleResult(result)));
  }

  public getByIdAsync(id: string): Observable<HttpRequestResultT<Product>> {
    return this._httpClient.get<HttpRequestResultT<Product>>(`${this._baseUrl}/GetByIdAsync?id=${id}`)
      .pipe(map(result => this.handleResult(result)));
  }

  public getByStoreIdAsync(storeId: string): Observable<HttpRequestResultT<Product[]>> {
    return this._httpClient.get<HttpRequestResultT<Product[]>>(`${this._baseUrl}/GetByStoreIdAsync?storeId=${storeId}`)
      .pipe(map(result => this.handleResult(result)));
  }

  public getByStoreIdCategoryIdAsync(storeId: string, categoryId: string): Observable<HttpRequestResultT<Product[]>> {
    return this._httpClient.get<HttpRequestResultT<Product[]>>(`${this._baseUrl}/GetByStoreIdCategoryIdAsync?storeId=${storeId}&categoryId=${categoryId}`)
      .pipe(map(result => this.handleResult(result)));
  }

  public getTop10SaleByQuantityAsync(storeId: string): Observable<HttpRequestResultT<ProductSaleTotalQuantity[]>> {
    return this._httpClient.get<HttpRequestResultT<ProductSaleTotalQuantity[]>>(`${this._baseUrl}/GetTop10SaleByQuantityAsync?storeId=${storeId}`)
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
