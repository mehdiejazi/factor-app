import { ModelBase } from "../base/model-base";
import * as Interfaces from '../../interfaces/user/user';
import { ImageAsset } from "../../interfaces/image-asset/image-asset";
import { Role } from "../../interfaces/role/role";
import { Store } from "../../interfaces/store/store";

export class User extends ModelBase implements Interfaces.User {

    public userName: string;
    public firstName: string;
    public lastName: string;
    public fullName: string;
    public nationalCode: string;
    public gender: number;
    public role: Role;
    public roleId: string;
    public isActive: boolean;
    public mobileNumberIsVerified: boolean;
    public emailIsVerified: boolean;
    public avatar: ImageAsset;
    public avatarId: string;
    public stores: Store[];
    public isForcedChangePassword: boolean;
}