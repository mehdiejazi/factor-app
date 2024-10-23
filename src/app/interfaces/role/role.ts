import * as Interfaces from '../user/user';
import { ModelBase } from '../base/model-base';
import { Category } from '../category/category';

export interface Role extends ModelBase {
    name:string;
    description:string;
    //public virtual ICollection<RoleActionPermission> RoleActionPermissions { get; set; }
    isDefault:boolean;
}

