import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import * as Interfaces from '../../../../interfaces/role/role';
import { Role } from '../../../../models/role/role';
import { RoleService } from '../../../../services/role.service';
import { ConfirmationModalComponent } from '../../../modals/confirmation-modal/confirmation-modal.component';
import { RoleFormModalComponent } from '../role-form-modal/role-form-modal.component';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.css'
})
export class RoleListComponent implements OnInit {
  public constructor(
    private _bsModalService: BsModalService,
    private _roleService: RoleService
  ) {}

  public roles: Interfaces.Role[] = [];
  public error: Error;
  public formSuccessful: boolean;
  public errorMessages: string[] = [];
  public informationMessages: string[] = [];
  public warningMessages: string[] = [];
  public isLoading: boolean = false;

  public ngOnInit(): void {
    this.fillTable();
  }

  public fillTable(): void {
    this.isLoading = true;

    this._roleService.getAllAsync().subscribe(
      result => {
        if (result.isSuccessful) {
          this.roles = result.data ?? [];
        } else {
          this.errorMessages = result.errorMessages ?? [];
        }

        this.isLoading = false;
      },
      error => {
        this.error = error;
        this.isLoading = false;
      }
    );
  }

  public onClickAddNew(): void {
    const role = new Role();
    role.isDefault = false;
    role.roleActionPermissions = [];
    role.name = '';
    role.description = '';

    this.openRoleForm(role, false);
  }

  public onClickEdit(role: Interfaces.Role): void {
    this.isLoading = true;
    this._roleService.getByIdAsync(role.id).subscribe(
      result => {
        this.isLoading = false;
        if (!result.isSuccessful) {
          this.errorMessages = result.errorMessages ?? [];
          return;
        }

        this.openRoleForm(result.data, true);
      },
      error => {
        this.error = error;
        this.isLoading = false;
      }
    );
  }

  public onClickDelete(role: Interfaces.Role): void {
    const strTitle = 'حذف';
    const strBody = 'آیا مایل به حذف این نقش هستید؟';

    const modal = this._bsModalService.show(ConfirmationModalComponent, {
      class: 'modal-dialog-centered modal-dialog'
    });

    (<ConfirmationModalComponent>modal.content).showConfirmationModal(strTitle, strBody);

    (<ConfirmationModalComponent>modal.content).onClose.subscribe(result => {
      if (result !== true) {
        return;
      }

      this._roleService.deleteByIdAsync(role.id).subscribe(
        deleteResult => {
          if (deleteResult.isSuccessful) {
            this.formSuccessful = true;
            this.fillTable();
          } else {
            this.errorMessages = deleteResult.errorMessages ?? [];
          }

          this.informationMessages = deleteResult.informationMessages ?? [];
          this.warningMessages = deleteResult.warningMessages ?? [];
        },
        error => {
          this.error = error;
        }
      );
    });
  }

  public onClickSetDefault(role: Interfaces.Role): void {
    if (role.isDefault) {
      return;
    }

    const strTitle = 'تنظیم نقش پیش‌فرض';
    const strBody = `آیا می‌خواهید نقش «${role.name}» به عنوان پیش‌فرض تنظیم شود؟`;

    const modal = this._bsModalService.show(ConfirmationModalComponent, {
      class: 'modal-dialog-centered modal-dialog'
    });

    (<ConfirmationModalComponent>modal.content).showConfirmationModal(strTitle, strBody);
    (<ConfirmationModalComponent>modal.content).onClose.subscribe(result => {
      if (result !== true) {
        return;
      }

      this._roleService.setDefaultRoleAsync(role.id).subscribe(
        setDefaultResult => {
          if (setDefaultResult.isSuccessful) {
            this.formSuccessful = true;
            this.fillTable();
          } else {
            this.errorMessages = setDefaultResult.errorMessages ?? [];
          }

          this.informationMessages = setDefaultResult.informationMessages ?? [];
          this.warningMessages = setDefaultResult.warningMessages ?? [];
        },
        error => {
          this.error = error;
        }
      );
    });
  }

  private openRoleForm(role: Interfaces.Role, isEdit: boolean): void {
    const modal = this._bsModalService.show(RoleFormModalComponent, {
      class: 'modal-xl modal-dialog-centered modal-dialog'
    });

    (<RoleFormModalComponent>modal.content).showConfirmationModal(role);
    (<RoleFormModalComponent>modal.content).onClose.subscribe(result => {
      if (result !== true) {
        return;
      }

      const changedRole = (<RoleFormModalComponent>modal.content).role;
      const request = isEdit ? this._roleService.updateAsync(changedRole) : this._roleService.insertAsync(changedRole);

      request.subscribe(
        serviceResult => {
          if (serviceResult.isSuccessful) {
            this.formSuccessful = true;
            this.fillTable();
          } else {
            this.errorMessages = serviceResult.errorMessages ?? [];
          }

          this.informationMessages = serviceResult.informationMessages ?? [];
          this.warningMessages = serviceResult.warningMessages ?? [];
        },
        error => {
          this.error = error;
        }
      );
    });
  }
}
