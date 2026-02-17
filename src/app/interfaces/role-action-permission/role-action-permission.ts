import { ActionPermission } from '../action-permission/action-permission';
import { ModelBase } from '../base/model-base';

export interface RoleActionPermission extends ModelBase {
  roleId: string;
  actionPermissionId: string;
  actionPermission: ActionPermission;
}
