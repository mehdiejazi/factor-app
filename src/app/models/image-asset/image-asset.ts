import * as Interfaces from '../../interfaces/image-asset/image-asset';
import { User } from '../../interfaces/user/user';
import { ModelBase } from '../base/model-base';

export class ImageAsset extends ModelBase implements Interfaces.ImageAsset {

    public constructor() {
        super();
    }

    public fileName: string;
    public url: string;
    public ownerUser: User;

}