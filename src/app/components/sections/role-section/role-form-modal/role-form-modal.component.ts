import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import * as ActionPermissionInterfaces from '../../../../interfaces/action-permission/action-permission';
import * as RoleInterfaces from '../../../../interfaces/role/role';
import { RoleActionPermission } from '../../../../models/role-action-permission/role-action-permission';
import { ActionPermissionService } from '../../../../services/action-permission.service';

@Component({
  selector: 'app-role-form-modal',
  templateUrl: './role-form-modal.component.html',
  styleUrl: './role-form-modal.component.css'
})
export class RoleFormModalComponent {
  public active: boolean = false;
  public title: string;
  public onClose: Subject<boolean>;
  public error: Error;
  public role: RoleInterfaces.Role;

  public actionPermissions: ActionPermissionInterfaces.ActionPermission[] = [];
  public selectedActionPermissionIds: string[] = [];
  public isLoadingPermissions: boolean = false;
  public permissionErrorMessages: string[] = [];

  public constructor(
    private _bsModalRef: BsModalRef,
    private _actionPermissionService: ActionPermissionService
  ) {}

  public ngOnInit(): void {
    this.onClose = new Subject();
  }

  public showConfirmationModal(role: RoleInterfaces.Role): void {
    this.role = JSON.parse(JSON.stringify(role));
    this.role.roleActionPermissions = this.role.roleActionPermissions ?? [];
    this.role.isDefault = this.role.isDefault ?? false;
    this.selectedActionPermissionIds = [...new Set(this.role.roleActionPermissions.map(item => item.actionPermissionId))];

    if (this.role?.id) {
      this.title = 'ویرایش نقش';
    } else {
      this.title = 'نقش جدید';
    }

    this.active = true;
    this.loadActionPermissions();
  }

  public hideConfirmationModal(): void {
    this.active = false;
    this.onClose.next(false);
    this._bsModalRef.hide();
  }

  public onCancel(): void {
    this.hideConfirmationModal();
  }

  public onConfirm(): void {
    if (this.isValidForm() === false) {
      return;
    }

    this.syncRoleActionPermissions();
    this.active = false;
    this.onClose.next(true);
    this._bsModalRef.hide();
  }

  public isPermissionSelected(actionPermissionId: string): boolean {
    return this.selectedActionPermissionIds.indexOf(actionPermissionId) > -1;
  }

  public onPermissionToggle(actionPermissionId: string, event: Event): void {
    const target = event.target as HTMLInputElement;

    if (target.checked) {
      if (!this.isPermissionSelected(actionPermissionId)) {
        this.selectedActionPermissionIds.push(actionPermissionId);
      }
      return;
    }

    this.selectedActionPermissionIds = this.selectedActionPermissionIds.filter(id => id !== actionPermissionId);
  }

  public onToggleSelectAll(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.selectedActionPermissionIds = this.actionPermissions.map(item => item.id);
      return;
    }

    this.selectedActionPermissionIds = [];
  }

  public areAllPermissionsSelected(): boolean {
    if (this.actionPermissions.length === 0) {
      return false;
    }

    return this.selectedActionPermissionIds.length === this.actionPermissions.length;
  }

  private isValidForm(): boolean {
    if (!this.role?.name || this.role.name.trim().length === 0) {
      return false;
    }

    return true;
  }

  private loadActionPermissions(): void {
    this.isLoadingPermissions = true;
    this.permissionErrorMessages = [];

    this._actionPermissionService.getAllAsync().subscribe(
      result => {
        if (result.isSuccessful) {
          this.actionPermissions = result.data ?? [];
        } else {
          this.permissionErrorMessages = result.errorMessages ?? [];
        }
        this.isLoadingPermissions = false;
      },
      error => {
        this.error = error;
        this.isLoadingPermissions = false;
      }
    );
  }

  private syncRoleActionPermissions(): void {
    const currentPermissions = this.role.roleActionPermissions ?? [];

    this.role.roleActionPermissions = this.selectedActionPermissionIds.map(actionPermissionId => {
      const existing = currentPermissions.find(item => item.actionPermissionId === actionPermissionId);
      if (existing) {
        return existing;
      }

      const roleActionPermission = new RoleActionPermission();
      roleActionPermission.roleId = this.role.id;
      roleActionPermission.actionPermissionId = actionPermissionId;

      const actionPermission = this.actionPermissions.find(item => item.id === actionPermissionId);
      if (actionPermission) {
        roleActionPermission.actionPermission = actionPermission;
      }

      return roleActionPermission;
    });
  }
}
