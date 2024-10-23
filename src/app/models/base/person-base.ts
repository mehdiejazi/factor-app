import { ModelBase } from "./model-base";

export class PersonBase extends ModelBase {

    public firstName: string;
    public lastName: string;
    public nationalCode: string;

    public fullName: string;
}