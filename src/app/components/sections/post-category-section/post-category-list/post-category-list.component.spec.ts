import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCategoryListComponent } from './post-category-list.component';

describe('PostCategoryListComponent', () => {
  let component: PostCategoryListComponent;
  let fixture: ComponentFixture<PostCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostCategoryListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
