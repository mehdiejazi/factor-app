import { ModelBase } from "./model-base";

export interface PersonBase extends ModelBase {

    firstName:string;
    lastName:string;
    nationalCode:string;

    fullName:string;
}