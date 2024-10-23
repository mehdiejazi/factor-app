import { PersonBase } from '../../models/base/person-base';

export interface Customer extends PersonBase {
    storeId: string;
}

