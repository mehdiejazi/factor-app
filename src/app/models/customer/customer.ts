import * as Interfaces from '../../interfaces/customer/customer';
import { PersonBase } from "../base/person-base";

export class Customer extends PersonBase implements Interfaces.Customer {
   
    public storeId: string;

}
