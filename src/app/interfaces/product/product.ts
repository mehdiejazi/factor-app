import * as Interfaces from '../user/user';
import { ModelBase } from '../base/model-base';
import { Category } from '../category/category';

export interface Product extends ModelBase {
    storeId: string;
    name:string;
    price:number; 
    category: Category;
    categoryId:string;
}

