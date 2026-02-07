import { ModelBase } from "../base/model-base";
import { ImageAsset } from "../image-asset/image-asset";
import { PostCategory } from "../post-category/post-category";
import { User } from "../user/user";


export interface BlogPost extends ModelBase {

    postCategories: PostCategory[];
    owner: User;
    ownerId: string;
    visitCount: string;
    isHot: boolean;
    isPublished: boolean;
    isStarRatingEnabled: boolean;
    title: string;
    body: string;
    extendedBody: string;
    publishDateTime: string;
    coverImage: ImageAsset;
    coverImageId: string;
    images: ImageAsset[];
    starRate: number;
}