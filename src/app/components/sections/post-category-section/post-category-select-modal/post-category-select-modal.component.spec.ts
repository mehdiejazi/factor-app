import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCategorySelectModalComponent } from './post-category-select-modal.component';

describe('PostCategorySelectModalComponent', () => {
  let component: PostCategorySelectModalComponent;
  let fixture: ComponentFixture<PostCategorySelectModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostCategorySelectModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostCategorySelectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
