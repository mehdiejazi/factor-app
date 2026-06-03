import * as Interfaces from '../../interfaces/role/role';
import { RoleActionPermission } from '../../interfaces/role-action-permission/role-action-permission';
import { ModelBase } from '../base/model-base';

export class Role extends ModelBase implements Interfaces.Role {
  public name: string;
  public description: string;
  public roleActionPermissions: RoleActionPermission[];
  public isDefault: boolean;
}
