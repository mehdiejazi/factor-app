import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCategoryFormModalComponent } from './post-category-form-modal.component';

describe('PostCategoryFormModalComponent', () => {
  let component: PostCategoryFormModalComponent;
  let fixture: ComponentFixture<PostCategoryFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostCategoryFormModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostCategoryFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
