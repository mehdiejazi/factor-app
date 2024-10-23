import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user/user';
import { Store } from '../models/store/store';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public constructor() {

    this.baseUrl = 'https://localhost:44386';
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
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }
  
  public setUser(user: User): void {
    const userJson = JSON.stringify(user);
    localStorage.setItem('user', userJson);
  }


  public getStore(): Store {
    const storeJson = localStorage.getItem('store');
    return storeJson ? JSON.parse(storeJson) : new Store();
  }
  
  public setStore(store: Store): void {
    const storeJson = JSON.stringify(store);
    localStorage.setItem('store', storeJson);
  }
  
  public getToken(): string {

    return localStorage.getItem('token') as string;

  }

  public setToken(jwt: string): void {

    localStorage.setItem('token', jwt);

  }

  public getRefreshToken(): string {

    return localStorage.getItem('refresh-token') as string;

  }

  public setRefreshToken(rToken: string): void {

    localStorage.setItem('refresh-token', rToken);

  }

  public isAuthenticated(): boolean {

    return (this.getToken() != null && this.getToken() != "" && this.getUser() != null);

  }

}
