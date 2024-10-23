import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SettingsService } from './settings.service';
import { LogManagerService } from './log-manager.service';
import { User } from '../interfaces/user/user';
import { Observable, map } from 'rxjs';
import { HttpRequestResultT } from '../models/http-request-result-t';
import { UserRegister } from '../interfaces/user/user-register';
import { ChangePassword } from '../interfaces/user/change-password';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public constructor(
  private _httpClient: HttpClient,
  private _settingsService: SettingsService,
  private _logManagerService: LogManagerService) {

  this._baseUrl = `${_settingsService.baseUrl}/User`;

}

private _baseUrl: string;



public deleteByIdAsync(id: string): Observable<HttpRequestResultT<User>> {
  let url = `${this._baseUrl}/GetByIdAsync?id=${id}`;

  let response = this._httpClient.get<HttpRequestResultT<User>>(url).pipe(map(result => {
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

public getAllAsync(): Observable<HttpRequestResultT<User[]>> {
  let url = `${this._baseUrl}/getAllAsync`;

  let response = this._httpClient.get<HttpRequestResultT<User[]>>(url).pipe(map(result => {
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

public getActiveAsync(): Observable<HttpRequestResultT<User[]>> {
  let url = `${this._baseUrl}/getActiveAsync`;

  let response = this._httpClient.get<HttpRequestResultT<User[]>>(url).pipe(map(result => {
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

public getInActiveAsync(): Observable<HttpRequestResultT<User[]>> {
  let url = `${this._baseUrl}/getInActiveAsync`;

  let response = this._httpClient.get<HttpRequestResultT<User[]>>(url).pipe(map(result => {
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

public getByIdAsync(id: string): Observable<HttpRequestResultT<User>> {
  let url = `${this._baseUrl}/GetByIdAsync?id=${id}`;

  let response = this._httpClient.get<HttpRequestResultT<User>>(url).pipe(map(result => {
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

public insertAsync(user:User): Observable<HttpRequestResultT<User>> {

  let url = `${this._baseUrl}/InsertAsync`;

  let response = this._httpClient.post<HttpRequestResultT<User>>(url, user,
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

public updateAsync(user: User): Observable<HttpRequestResultT<User>> {

  let url = `${this._baseUrl}/UpdateAsync`;

  let response = this._httpClient.post<HttpRequestResultT<User>>
    (url, user, this._settingsService.httpOptions).pipe(map(result => {

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

public registerAsync(register:UserRegister): Observable<HttpRequestResultT<User>> {

  let url = `${this._baseUrl}/RegisterAsync`;

  let response = this._httpClient.post<HttpRequestResultT<User>>(url, register,
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

public changePasswordAsync(changePassword:ChangePassword): Observable<HttpRequestResultT<User>> {

  let url = `${this._baseUrl}/RegisterAsync`;

  let response = this._httpClient.post<HttpRequestResultT<User>>(url, changePassword,
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

public userToggleActivationAsync(user:User): Observable<HttpRequestResultT<User>> {

  let url = `${this._baseUrl}/UpdateAsync`;

  user.isActive = !user.isActive;

  let response = this._httpClient.post<HttpRequestResultT<User>>
    (url, user, this._settingsService.httpOptions).pipe(map(result => {

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