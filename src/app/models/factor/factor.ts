import { FactorItem } from '../../interfaces/factor-item/factor-item';
import * as Interfaces from '../../interfaces/factor/factor';
import { Store } from '../../interfaces/store/store';
import { ModelBase } from '../base/model-base';
import { Customer } from '../customer/customer';

export class Factor extends ModelBase implements Interfaces.Factor {

    public constructor(){
        
        super();
        this.owner = new Customer();
        
    }

    public owner: Customer;
    public ownerId: string;
    public store: Store;
    public storeId: string;
    public description: string;
    public totalPrice: number;
    public isClosed: boolean;
    public sellDateTime: string;

    public factorItems: FactorItem[];
}   

