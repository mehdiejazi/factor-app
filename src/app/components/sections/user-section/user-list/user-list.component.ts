import { Component } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SettingsService } from '../../../../services/settings.service';
import { Router } from '@angular/router';
import * as Interfaces from '../../../../interfaces/user/user';
import { ConfirmationModalComponent } from '../../../modals/confirmation-modal/confirmation-modal.component';
import { UserFormModalComponent } from '../user-form-modal/user-form-modal.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  public constructor(
    private _userService: UserService,
    private _bsModalService: BsModalService,
    private _settingsService: SettingsService,
    private _router: Router) {

  }

  public ngOnInit(): void {

    this.fillTable();

  }

  public users: Interfaces.User[];
  public error: Error;
  public formSuccessful: boolean;
  public errorMessages: string[] = [];
  public informationMessages: string[] = [];
  public warningMessages: string[] = [];

  public onClickForceChangePassword(user: Interfaces.User) {

    let strIsActive ='';
    if (user.mobileNumberIsVerified) {
      strIsActive = 'حذف اجبار';
    }
    else {
      strIsActive = 'احبار';
    }

    let strTitle = 'تغییر کلمه عبور';
    let strBody = `آیا مایل به ${strIsActive} این کاربر به تغییر رمز عبور هستید؟`;

    const modal = this._bsModalService.show(ConfirmationModalComponent);
    (<ConfirmationModalComponent>modal.content).showConfirmationModal(strTitle, strBody);
    (<ConfirmationModalComponent>modal.content).onClose.subscribe(result => {
      if (result === true) {

        user.isForcedChangePassword = !user.isForcedChangePassword;
        this._userService.updateAsync(user).subscribe(result => {

          if (result.isSuccessful) {

            this.formSuccessful = true;
            user = result.data;
          }
          else {

            this.errorMessages = result.errorMessages;

          }

          if (result.informationMessages !== null)
            this.informationMessages = result.informationMessages;

          if (result.warningMessages !== null)
            this.warningMessages = result.warningMessages;
        },
          error => {

            this.error = error;

          }
        );

      } else if (result === false) {

      }
    });

  }

  public onClickEdit(user: Interfaces.User) {
    const modal = this._bsModalService.show(UserFormModalComponent,
      { class: 'modal-xl modal-dialog-centered modal-dialog' });

    (<UserFormModalComponent>modal.content).showConfirmationModal(user);
    (<UserFormModalComponent>modal.content).onClose.subscribe(result => {
      if (result == true) {

        let newUser = modal.content.user;
        this._userService.updateAsync(newUser).subscribe(result => {

          if (result.isSuccessful) {

            this.formSuccessful = true;
            user = result.data;
          }
          else {

            this.errorMessages = result.errorMessages;

          }

          if (result.informationMessages !== null)
            this.informationMessages = result.informationMessages;

          if (result.warningMessages !== null)
            this.warningMessages = result.warningMessages;
        },
          error => {

            this.error = error;

          }
        );
      }
    });
  }

  public onClickDelete(user: Interfaces.User) {

    let strTitle = 'حذف';
    let strBody = 'آیا مایل به حذف هستید؟'

    const modal = this._bsModalService.show(ConfirmationModalComponent,
      { class: 'modal-dialog-centered modal-dialog' });

    (<ConfirmationModalComponent>modal.content).showConfirmationModal(
      strTitle, strBody
    );

    (<ConfirmationModalComponent>modal.content).onClose.subscribe(result => {
      if (result === true) {

        this._userService.deleteByIdAsync(user.id).subscribe(
          result => {

            if (result.isSuccessful) {
              this.fillTable();
              this.formSuccessful = true;
            }
            else {
              result.errorMessages.forEach(msg => this.errorMessages.push(msg));
            }

            result.informationMessages.forEach(msg => this.informationMessages.push(msg));
            result.warningMessages.forEach(msg => this.warningMessages.push(msg));

          },
          error => {

            this.error = error;
            console.error(error);

          }
        );

      }
    });
  }

  public onClickAddNew() {
    throw new Error('Method not implemented.');
  }

  public fillTable() {

    this._userService.getAllAsync().subscribe(result => {

      this.users = result.data;
      this.users.forEach(user => {

        if (user.avatar !== null)
          user.avatar.url = this._settingsService.baseUrl + user.avatar.url

      });

    },
      error => {

        this.error = error;
        console.error(error);

      }
    );

  }

  public activationToggle(user: Interfaces.User): void {

    let strIsActive = "";
    if (!user.isActive) {
      strIsActive = 'فعال';
    }
    else {
      strIsActive = 'غیر فعال';
    }

    let strFullName = (user.firstName.trim() + ' ' + user.lastName).trim();

    let strTitle = strIsActive + ' سازی';
    let strBody = 'آیا مایل به ' + strIsActive + ' سازی «' + strFullName + '» هستید؟'

    const modal = this._bsModalService.show(ConfirmationModalComponent);
    (<ConfirmationModalComponent>modal.content).showConfirmationModal(
      strTitle, strBody
    );

    (<ConfirmationModalComponent>modal.content).onClose.subscribe(result => {
      if (result === true) {

        this._userService.userToggleActivationAsync(user).subscribe(result => {

          user = result.data;
          this.fillTable();

        },
          error => {

            this.error = error;
            console.error(error);

          }
        );

      } else if (result === false) {

      }
    });
  }

  public viewUserLogs(user: Interfaces.User): void {

    this._router.navigate(['/users/log'], { queryParams: { id: user.id } });

  }

  public viewUserProfile(user: Interfaces.User): void {

    this._router.navigate(['/users/profile'], { queryParams: { user: user.userName } });

  }

  public viewOrders(user: Interfaces.User) {

    this._router.navigate(['/users/order'], { queryParams: { id: user.id } });

  }

}
