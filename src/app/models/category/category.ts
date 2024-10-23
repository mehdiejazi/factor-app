import { ModelBase } from "../base/model-base";
import * as Interfaces from '../../interfaces/category/category';

export class Category extends ModelBase implements Interfaces.Category {
    
    public storeId: string;
    public name: string;
}
