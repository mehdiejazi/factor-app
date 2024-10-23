import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySelectModalComponent } from './category-select-modal.component';

describe('CategorySelectModalComponent', () => {
  let component: CategorySelectModalComponent;
  let fixture: ComponentFixture<CategorySelectModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategorySelectModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategorySelectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
