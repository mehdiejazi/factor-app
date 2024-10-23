import { ModelBase } from "../base/model-base";
import { ImageAsset } from "../image-asset/image-asset";
import { Role } from "../role/role";
import { Store } from "../store/store";

export interface User extends ModelBase {
    userName: string;
    firstName: string;
    lastName: string;

    fullName: string;
    nationalCode: string;

    gender: number;
    role: Role;
    roleId: string;
    isActive: boolean;
    mobileNumberIsVerified: boolean;
    emailIsVerified: boolean;

    avatar: ImageAsset;
    avatarId: string;
    stores: Store[];
    isForcedChangePassword: boolean;

}