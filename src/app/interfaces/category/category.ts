import { ModelBase } from "../base/model-base";

export interface Category extends ModelBase { 
    storeId: string;
    name: string;
}
