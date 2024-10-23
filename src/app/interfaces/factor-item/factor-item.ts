import { Product } from "../product/product";
import { ModelBase } from "../base/model-base";

export interface FactorItem extends ModelBase { 
    
    description:string;
    factorId:string;
    product:Product;
    productId:string;
    quantity:number;
    offPercent:number;
    price:number;
}