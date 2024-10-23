import { ModelBase } from "../base/model-base";
import * as Interfaces from '../../interfaces/store/store';
import { ImageAsset } from "../image-asset/image-asset";

export class Store extends ModelBase implements Interfaces.Store {
    
    public storeEnglishName: string;
    public name: string;
    public ownerId: string;
    public url: string;
    public logoId: string;
    public description: string;
    public logo: ImageAsset;
}
