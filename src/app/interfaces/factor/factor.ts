import { Store } from "../store/store";
import { ModelBase } from "../base/model-base";
import { Customer } from "../customer/customer";
import { FactorItem } from "../factor-item/factor-item";

export interface Factor extends ModelBase { 
    owner:Customer;
    ownerId:string;
    store:Store; 
    storeId:string;
    description:string; 
    factorItems:FactorItem[];
    totalPrice:number;
    isClosed:boolean;
    sellDateTime:string;
}
