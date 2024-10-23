import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { Category } from '../../../../interfaces/category/category';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CategoryService } from '../../../../services/category.service';
import { SettingsService } from '../../../../services/settings.service';

@Component({
  selector: 'app-category-select-modal',
  templateUrl: './category-select-modal.component.html',
  styleUrl: './category-select-modal.component.css'
})
export class CategorySelectModalComponent {

  public active: boolean = false;
  public title: string;
  public onClose: Subject<boolean>;
  public error: Error;
  public categories: Category[];
  public categoriesFilter: Category[];
  public selectedCategory: Category;

  public txtSearch: string;

  public constructor(private _bsModalRef: BsModalRef,
    private _categoryService:CategoryService,
    private _settingsService: SettingsService) { }

  public ngOnInit(): void {

    this.onClose = new Subject();
  }


  public fillStores() {

    this._categoryService.getByStoreIdAsync(this._settingsService.getStore().id)
      .subscribe(
        result => {

          this.categories = result.data;
          this.categoriesFilter = this.categories;

        },
        error => {

          this.error = error;
          console.error(error);

        }
      );
  }


  public showConfirmationModal(): void {

    this.fillStores();
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

    this.categoriesFilter = this.categories
      .filter(bsh => bsh.name.includes(newValue));

  }

  public unSelectCards() {

    var cards = document.querySelectorAll(".card-items");
    cards.forEach(element => {
      element.classList.remove('bg-primary');
    });

  }

  public onCardClick(e: any, category: Category): void {

    this.unSelectCards();

    const clickedElement = e.target;

    if (clickedElement.closest('.card-items')) {
      clickedElement.closest('.card-items').classList.add('bg-primary');
    }

    this.selectedCategory = category;

  }

  public onConfirm() {

    this.active = false;
    this.onClose.next(true);
    this._bsModalRef.hide();

  }
}
