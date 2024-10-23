import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreFormModalComponent } from './store-form-modal.component';

describe('StoreFormModalComponent', () => {
  let component: StoreFormModalComponent;
  let fixture: ComponentFixture<StoreFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StoreFormModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StoreFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
