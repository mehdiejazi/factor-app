import { ModelBase } from "../base/model-base";
import * as Interfaces from '../../interfaces/product/product';
import { Category } from "../../interfaces/category/category";

export class Product extends ModelBase implements Interfaces.Product {
    public storeId: string;
    public name: string;
    public price: number;
    public category: Category;
    public categoryId: string;
}
