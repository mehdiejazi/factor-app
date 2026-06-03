import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SettingsService } from '../../../../services/settings.service';
import { ConfirmationModalComponent } from '../../../modals/confirmation-modal/confirmation-modal.component';
import { BlogPost } from '../../../../models/blog-post/blog-post';
import { BlogPostService } from '../../../../services/blog-post.service';
import { ImageAsset } from '../../../../interfaces/image-asset/image-asset';
import { ImageAssetSelectModalComponent } from '../../image-asset-section/image-asset-select-modal/image-asset-select-modal.component';
import { PostCategory } from '../../../../models/post-category/post-category';
import { PostCategorySelectModalComponent } from '../../post-category-section/post-category-select-modal/post-category-select-modal.component';

@Component({
  selector: 'app-weblog-form',
  templateUrl: './weblog-form.component.html',
  styleUrls: ['./weblog-form.component.css']
})
export class WeblogFormComponent implements OnInit {

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
        this.blogPost.images = [];
      }

    });

  }


  public delImage(image: ImageAsset) {

    let strTitle = 'حذف';
    let strBody = 'آیا مایل به حذف این آیتم هستید؟';

    const modal = this._bsModalService.show(ConfirmationModalComponent);
    (<ConfirmationModalComponent>modal.content).showConfirmationModal(
      strTitle, strBody
    );

    (<ConfirmationModalComponent>modal.content).onClose.subscribe(result => {
      if (result === true) {
        var index = this.blogPost.images.indexOf(image);
        if (index !== -1) {

          this.blogPost.images.splice(index, 1);

        }

      } else if (result === false) {

      }
    });
  }

  public addImage() {

    const modal = this._bsModalService.show(ImageAssetSelectModalComponent,
      { class: 'modal-xl modal-dialog-centered modal-dialog' });
    (<ImageAssetSelectModalComponent>modal.content).showConfirmationModal(this._settingsService.tempUserId);

    (<ImageAssetSelectModalComponent>modal.content).onClose.subscribe(result => {

      if (result === true) {

        this.blogPost.images.push(modal.content.selectedImageAsset);

      } else if (result === false) {

      }

    });
  }


  public onClickAddPostCategory(): void {

    const modal = this._bsModalService.show(PostCategorySelectModalComponent,
      { class: 'modal-xl modal-dialog-centered modal-dialog' });
    (<PostCategorySelectModalComponent>modal.content).showConfirmationModal();

    (<PostCategorySelectModalComponent>modal.content).onClose.subscribe(result => {

      if (result === true) {

        if (this.blogPost.postCategories.indexOf(modal.content.selectedPostCategory) == -1)
          this.blogPost.postCategories.push(modal.content.selectedPostCategory);

      } else if (result === false) {

      }

    });
  }

  public onClosePostCategory(postCategory: PostCategory) {

    var index = this.blogPost.postCategories.indexOf(postCategory);
    if (index > -1)
      this.blogPost.postCategories.splice(index, 1);

  }

  public isValidForm(): boolean {

    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;

    if (form.checkValidity() === false) {
      return false;
    }

    //alert(22);
    form.classList.add('was-validated');
    return true;

  }

  public selectCoverImage() {

    const modal = this._bsModalService.show(ImageAssetSelectModalComponent,
      { class: 'modal-xl modal-dialog-centered modal-dialog' });
    (<ImageAssetSelectModalComponent>modal.content).showConfirmationModal(this._settingsService.tempUserId);

    (<ImageAssetSelectModalComponent>modal.content).onClose.subscribe(result => {

      if (result === true) {

        this.blogPost.coverImage = modal.content.selectedImageAsset;
        this.warningMessages = [];

      } else if (result === false) {

      }

    });

  }

  public submitAddBlogPost() {

    if (this.isValidForm() === false)
      return;

    this.blogPost.ownerId = this._settingsService.getUser().id;

    this._blogPostService.insertAsync(this.blogPost).subscribe(result => {

      if (result.isSuccessful)

        this.blogPost = result.data;

      else {

        this.errorMessages = result.errorMessages;

      }
      if (result.informationMessages !== null)
        this.informationMessages = result.informationMessages;

      if (result.warningMessages !== null)
        this.warningMessages = result.warningMessages;

    },
      error => {

        this.error = error;
        console.error(error?.message);

      }
    );

  }

  public submitUpdateBlogPost() {

    if (this.isValidForm() === false)
      return;

    this._blogPostService.updateAsync(this.blogPost).subscribe(result => {

      if (result.isSuccessful) {

        this.blogPost = result.data;

      }
      else {

        this.errorMessages = result.errorMessages;

      }
      if (result.informationMessages !== null)
        this.informationMessages = result.informationMessages;

      if (result.warningMessages !== null)
        this.warningMessages = result.warningMessages;

    },
      error => {

        this.error = error;
        console.error(error?.message);

      }
    );

  }

}

