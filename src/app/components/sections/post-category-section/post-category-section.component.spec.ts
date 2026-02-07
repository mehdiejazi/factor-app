import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCategorySectionComponent } from './post-category-section.component';

describe('PostCategorySectionComponent', () => {
  let component: PostCategorySectionComponent;
  let fixture: ComponentFixture<PostCategorySectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostCategorySectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostCategorySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
