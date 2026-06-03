import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user/user';
import { Store } from '../models/store/store';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private readonly userStorageKey = 'user';
  private readonly storeStorageKey = 'store';
  private readonly tokenStorageKey = 'token';
  private readonly refreshTokenStorageKey = 'refresh-token';

  public constructor() {

    this.baseUrl = 'https://localhost:5001';
  }
  
  public isMobileSize: boolean = false;
  public isSideBarOpen: boolean = true;
  public tempUserId: string = '8edb69b8-b11a-4449-a22b-fa7621403a23';

  public baseUrl: string;

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  public httpOptionsForm = {
    headers: new HttpHeaders({
    })
  };

  public getUser(): User {
    const userJson = localStorage.getItem(this.userStorageKey);
    return userJson ? JSON.parse(userJson) : null;
  }
  
  public setUser(user: User | null): void {
    if (!user) {
      localStorage.removeItem(this.userStorageKey);
      return;
    }

    const userJson = JSON.stringify(user);
    localStorage.setItem(this.userStorageKey, userJson);
  }


  public getStore(): Store {
    const storeJson = localStorage.getItem(this.storeStorageKey);
    return storeJson ? JSON.parse(storeJson) : new Store();
  }
  
  public setStore(store: Store | null): void {
    if (!store) {
      localStorage.removeItem(this.storeStorageKey);
      return;
    }

    const storeJson = JSON.stringify(store);
    localStorage.setItem(this.storeStorageKey, storeJson);
  }
  
  public getToken(): string {

    return localStorage.getItem(this.tokenStorageKey) as string;

  }

  public setToken(jwt: string): void {

    if (!jwt) {
      localStorage.removeItem(this.tokenStorageKey);
      return;
    }

    localStorage.setItem(this.tokenStorageKey, jwt);

  }

  public getRefreshToken(): string {

    return localStorage.getItem(this.refreshTokenStorageKey) as string;

  }

  public setRefreshToken(rToken: string): void {

    if (!rToken) {
      localStorage.removeItem(this.refreshTokenStorageKey);
      return;
    }

    localStorage.setItem(this.refreshTokenStorageKey, rToken);

  }

  public clearSessionData(): void {
    this.setStore(null);
    this.setUser(null);
    this.setToken('');
    this.setRefreshToken('');
  }

  public isAuthenticated(): boolean {

    return (this.getToken() != null && this.getToken() != "" && this.getUser() != null);

  }

}
