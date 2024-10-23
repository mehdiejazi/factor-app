import { ModelBase } from "../base/model-base";
import { ImageAsset } from "../image-asset/image-asset";

export interface Store extends ModelBase {
    storeEnglishName: string;
    name: string;
    ownerId: string;
    url: string;
    logoId: string;
    description: string;
    logo:ImageAsset;
}