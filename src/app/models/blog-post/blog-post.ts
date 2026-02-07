import * as Interfaces from '../../interfaces/blog-post/blog-post';
import { ModelBase } from '../base/model-base';
import { ImageAsset } from '../image-asset/image-asset';
import { PostCategory } from '../post-category/post-category';
import { User } from '../user/user';

export class BlogPost extends ModelBase implements Interfaces.BlogPost  {
    
    public postCategories: PostCategory[];
    public owner: User;
    public ownerId: string;
    public visitCount: string;
    public isHot: boolean;
    public isPublished: boolean;
    public isStarRatingEnabled: boolean;
    public title: string;
    public body: string;
    public extendedBody: string;
    public publishDateTime: string;
    public coverImage: ImageAsset;
    public coverImageId: string;
    public images: ImageAsset[];
    public starRate: number;
   
}