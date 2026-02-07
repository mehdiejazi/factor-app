import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BlogPostService } from '../../../../services/blog-post.service';
import { SettingsService } from '../../../../services/settings.service';
import { BlogPost } from '../../../../interfaces/blog-post/blog-post';
import { ConfirmationModalComponent } from '../../../modals/confirmation-modal/confirmation-modal.component';


@Component({
  selector: 'app-grid-weblog',
  templateUrl: './grid-weblog.component.html',
  styleUrls: ['./grid-weblog.component.css']
})
export class GridWeblogComponent implements OnInit {

  public constructor(
    private _blogPostService: BlogPostService,
    private _bsModalService: BsModalService,
    private _settingsService: SettingsService,
    private _router: Router) { }

  public ngOnInit(): void {

    this.fillTable();

  }

  public blogPosts: BlogPost[];
  public error: Error;

  public fillTable() {

    this._blogPostService.getAllAsync().subscribe(result => {

      this.blogPosts = result.data;

      if (this.blogPosts != null) {

        this.blogPosts.forEach(post => {

          if (post.coverImage !== null) {

            post.coverImage.url = this._settingsService.baseUrl + post.coverImage.url;

          }

          if (post.images !== null) {

            post.images.forEach(image => {

              image.url = this._settingsService.baseUrl + image.url;

            });

          }

        });

      }
    },
      error => {

        this.error = error;
        console.error(error);

      }
    );

  }

  public editPost(blogPost: BlogPost) {

    this._router.navigate(['/weblog/form'], { queryParams: { id: blogPost.id } });

  }

  public viewPost(blogPost: BlogPost) {

    this._router.navigate(['/weblog/view'], { queryParams: { id: blogPost.id } });


  }


  public toggleIsHot(blogPost: BlogPost) {

    let strIsHot = "";
    if (!blogPost.isHot) {
      strIsHot = 'داغ کردن';
    }
    else {
      strIsHot = 'حذف داغ کردن';
    }

    let strTitle = strIsHot;
    let strBody = 'آیا مایل به ' + strIsHot + ' این پست هستید؟';

    const modal = this._bsModalService.show(ConfirmationModalComponent);
    (<ConfirmationModalComponent>modal.content).showConfirmationModal(
      strTitle, strBody
    );

    (<ConfirmationModalComponent>modal.content).onClose.subscribe(result => {
      if (result === true) {

        blogPost.isHot = !blogPost.isHot;

        this._blogPostService.updateAsync(blogPost).subscribe(result => {

          blogPost = result.data;
          this.fillTable();

        },
          error => {

            this.error = error;
            console.error(error);

          }
        );

      } else if (result === false) {

      }
    });

  }
  public toggleIsPublished(blogPost: BlogPost) {

    let strIsPublished = "";
    if (!blogPost.isPublished) {
      strIsPublished = 'انتشار';
    }
    else {
      strIsPublished = 'عدم انتشار';
    }

    let strTitle = strIsPublished;
    let strBody = 'آیا مایل به ' + strIsPublished + ' این پست هستید؟';

    const modal = this._bsModalService.show(ConfirmationModalComponent);
    (<ConfirmationModalComponent>modal.content).showConfirmationModal(
      strTitle, strBody
    );

    (<ConfirmationModalComponent>modal.content).onClose.subscribe(result => {
      if (result === true) {

        blogPost.isPublished = !blogPost.isPublished;

        this._blogPostService.updateAsync(blogPost).subscribe(result => {

          blogPost = result.data;
          this.fillTable();

        },
          error => {

            this.error = error;
            console.error(error);

          }
        );

      } else if (result === false) {

      }
    });

  }


}
