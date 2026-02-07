import { User } from '../../interfaces/user/user';
import * as Interfaces from '../../interfaces/post-category/post-category';

export class PostCategory implements Interfaces.PostCategory {
    public constructor() {

        this.name = '';

    }
    id: string;
    insertDateTime: string;
    updateDateTime: string;
    deleteDateTime: string;
    isDeleted: boolean;

    public name: string;
    public owner: User;
    public owenerId: string;
}
