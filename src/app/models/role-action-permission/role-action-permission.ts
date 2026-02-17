import { ActionPermission } from '../../interfaces/action-permission/action-permission';
import * as Interfaces from '../../interfaces/role-action-permission/role-action-permission';
import { ModelBase } from '../base/model-base';

export class RoleActionPermission extends ModelBase implements Interfaces.RoleActionPermission {
  public roleId: string;
  public actionPermissionId: string;
  public actionPermission: ActionPermission;
}
