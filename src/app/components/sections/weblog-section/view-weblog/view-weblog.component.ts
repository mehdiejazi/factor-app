import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SettingsService } from '../../../../services/settings.service';
import { BlogPost } from '../../../../models/blog-post/blog-post';
import { BlogPostService } from '../../../../services/blog-post.service';


@Component({
  selector: 'app-view-weblog',
  templateUrl: './view-weblog.component.html',
  styleUrls: ['./view-weblog.component.css']
})
export class ViewWeblogComponent implements OnInit {

  // public customOptions: OwlOptions;

  public error: Error;

  public errorMessages: string[];
  public warningMessages: string[];
  public informationMessages: string[];

  public blogPost: BlogPost;

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
            
          },
          error => {

            this.error = error;
            console.error(error);

          }
        );
      }
      else {

        this.blogPost = new BlogPost();
        this.blogPost.postCategories = [];
      }

    });

    // this.initOwlCarousel();
  }
}
