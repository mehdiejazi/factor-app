import { ModelBase } from "../base/model-base";
import * as Interfaces from '../../interfaces/user/user-register';


export class UserRegister implements Interfaces.UserRegister {

    public userName:string;
    public password:string;
    public firstName:string;
    public lastName:string;
 
}
