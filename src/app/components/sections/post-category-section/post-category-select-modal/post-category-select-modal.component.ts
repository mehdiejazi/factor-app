import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { PostCategory } from '../../../../models/post-category/post-category';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { PostCategoryService } from '../../../../services/post-category.service';
import { SettingsService } from '../../../../services/settings.service';

@Component({
  selector: 'app-post-category-select-modal',
  templateUrl: './post-category-select-modal.component.html',
  styleUrl: './post-category-select-modal.component.css'
})
export class PostCategorySelectModalComponent {

  public active: boolean = false;
  public title: string;
  public onClose: Subject<boolean>;
  public error: Error;
  public postCategories: PostCategory[];
  public postCategoriesFilter: PostCategory[];
  public selectedPostCategory: PostCategory;

  public txtSearch: string;

  public constructor(private _bsModalRef: BsModalRef,
    private _postCategoryService: PostCategoryService,
    private _settingsService: SettingsService) { }

  public ngOnInit(): void {

    this.onClose = new Subject();
  }


  public fillData() {

    this._postCategoryService.getAllAsync().subscribe(result => {

      this.postCategories = result.data;
      this.postCategoriesFilter = this.postCategories;

    },
      error => {

        this.error = error;
        console.error(error);

      }
    );
  }


  public showConfirmationModal(): void {

    this.fillData();
    this.title = 'انتخاب دسته بندی';
    this.active = true;

  }

  public hideConfirmationModal(): void {

    this.active = false;
    this.onClose.next(false);
    this._bsModalRef.hide();

  }

  public onCancel(): void {

    this.active = false;
    this.onClose.next(false);
    this._bsModalRef.hide();

  }

  public onTextChangedSearch(newValue: any): void {

    this.postCategoriesFilter = this.postCategories
      .filter(bsh => bsh.name.includes(newValue));

  }

  public unSelectCards() {

    var cards = document.querySelectorAll(".card-items");
    cards.forEach(element => {
      element.classList.remove('bg-primary');
    });

  }

  public onCardClick(e: any, postCategory: PostCategory): void {

    this.unSelectCards();

    const clickedElement = e.target;

    if (clickedElement.closest('.card-items')) {
      clickedElement.closest('.card-items').classList.add('bg-primary');
    }

    this.selectedPostCategory = postCategory;

  }

  public onConfirm() {

    this.active = false;
    this.onClose.next(true);
    this._bsModalRef.hide();

  }
}