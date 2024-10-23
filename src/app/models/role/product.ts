import { ModelBase } from "../base/model-base";
import * as Interfaces from '../../interfaces/role/role';

export class Role extends ModelBase implements Interfaces.Role {
    name: string;
    description: string;
    isDefault: boolean;
}
