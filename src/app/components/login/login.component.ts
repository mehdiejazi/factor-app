import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingsService } from '../../services/settings.service';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/auth/login-request';
import { LoginResponse } from '../../models/auth/login-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public isLoading: boolean = true;
  public loginRequest: LoginRequest = new LoginRequest();
  public loginResponse: LoginResponse = new LoginResponse();

  public errorMessages: string[] = [];
  public informationMessages: string[] = [];
  public warningMessages: string[] = [];
  public returnUrl: string = "";

  public error: Error = new Error();

  public constructor(
    private _settingsService: SettingsService,
    private _authService: AuthService,
    private _router: Router,
    private _route: ActivatedRoute) {

  }

  public ngOnInit(): void {

    this.isLoading = false;
    this._route.queryParams.subscribe(params => {

      if (params['returnUrl']) {
        this.returnUrl = atob(params['returnUrl']);
      }

    });

    if (this._settingsService.isAuthenticated()) {

      if (this.returnUrl != "")
        this._router.navigate([this.returnUrl]);
      else
        this._router.navigate(['/dashboard']);

    }
  }

  public onClickLogin() {

    this.isLoading = true;

    this.errorMessages = [];
    this.informationMessages = [];
    this.warningMessages = [];

    this._authService.loginAsync(this.loginRequest).subscribe(
      result => {

        if (result.isSuccessful) {

          this.loginResponse = result.data;
          this._settingsService.setUser(this.loginResponse.user);
          this._settingsService.setToken(this.loginResponse.token);
          this._settingsService.setRefreshToken(this.loginResponse.refreshToken);

          if (this.returnUrl != "")
            this._router.navigate([this.returnUrl]);
          else
            this._router.navigate(['/dashboard']);

        }
        else {

          this.isLoading = false;

          if (result.errorMessages)
            result.errorMessages.forEach(er => this.errorMessages.push(er));

          if (result.informationMessages)
            result.informationMessages.forEach(er => this.informationMessages.push(er));

          if (result.warningMessages)
            result.warningMessages.forEach(er => this.warningMessages.push(er));
        }
      },
      error => {
        this.error = error;
        console.error(error?.message);
        this.isLoading = false;
        this.errorMessages.push('خطا در ارتباط با سرور');
      }
    );
  }
}
