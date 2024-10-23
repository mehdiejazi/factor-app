import * as Interfaces from '../user/user';
import { ModelBase } from '../base/model-base';

export interface ImageAsset extends ModelBase {
 
    fileName:string;
    url:string;
    ownerUser:Interfaces.User;
    isDeleted:boolean;
}