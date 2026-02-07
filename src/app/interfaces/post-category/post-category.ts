import { ModelBase } from "../base/model-base";
import { User } from "../user/user";

export interface PostCategory extends ModelBase{

    name: string;
    owner:User;
    owenerId: string;
}