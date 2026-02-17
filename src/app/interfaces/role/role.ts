import { ModelBase } from '../base/model-base';
import { RoleActionPermission } from '../role-action-permission/role-action-permission';

export interface Role extends ModelBase {
    name:string;
    description:string;
    roleActionPermissions: RoleActionPermission[];
    isDefault:boolean;
}

