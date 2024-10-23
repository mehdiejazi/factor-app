import { Product } from "../product/product";
import { ModelBase } from "../base/model-base";
import * as Interfaces from '../../interfaces/factor-item/factor-item';

export class FactorItem extends ModelBase implements Interfaces.FactorItem {
  
    public description:string;
    public factorId:string;
    public product:Product;
    public productId:string;
    public quantity:number;
    public offPercent:number;
    public price:number;
}