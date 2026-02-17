import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SettingsService } from '../../../../services/settings.service';
import { BlogPost } from '../../../../models/blog-post/blog-post';
import { BlogPostService } from '../../../../services/blog-post.service';


@Component({
  selector: 'app-weblog-view',
  templateUrl: './weblog-view.component.html',
  styleUrls: ['./weblog-view.component.css']
})
export class WeblogViewComponent implements OnInit {

  // public customOptions: OwlOptions;

  public error: Error;

  public errorMessages: string[];
  public warningMessages: string[];
  public informationMessages: string[];

  public blogPost: BlogPost;
  public isLoading: boolean = true;

  public constructor(private _bsModalService: BsModalService,
    private _blogPostService: BlogPostService,
    private _settingsService: SettingsService,
    private _route: ActivatedRoute) { }

  public ngOnInit(): void {

    this._route.queryParams.subscribe(params => {

      if (params['id']) {
        this._blogPostService.getByIdAsync(params['id']).subscribe(
          result => {

            this.blogPost = result.data;
            this.normalizePostAssets(this.blogPost);
            this.isLoading = false;
            
          },
          error => {

            this.error = error;
            console.error(error);
            this.isLoading = false;

          }
        );
      }
      else {

        this.blogPost = new BlogPost();
        this.blogPost.postCategories = [];
        this.isLoading = false;
      }

    });

    // this.initOwlCarousel();
  }

  private normalizePostAssets(post: BlogPost): void {
    if (!post) {
      return;
    }

    if (post.coverImage?.url) {
      post.coverImage.url = this.normalizeUrl(post.coverImage.url);
    }

    if (post.owner?.avatar?.url) {
      post.owner.avatar.url = this.normalizeUrl(post.owner.avatar.url);
    }

    if (post.images?.length) {
      post.images = post.images.map(image => ({
        ...image,
        url: image?.url ? this.normalizeUrl(image.url) : image?.url
      }));
    }
  }

  private normalizeUrl(url: string): string {
    if (!url) {
      return url;
    }

    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }

    return `${this._settingsService.baseUrl}${url}`;
  }
}
