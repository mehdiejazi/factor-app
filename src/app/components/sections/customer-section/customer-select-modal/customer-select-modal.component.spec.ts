import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSelectModalComponent } from './customer-select-modal.component';

describe('CustomerSelectModalComponent', () => {
  let component: CustomerSelectModalComponent;
  let fixture: ComponentFixture<CustomerSelectModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerSelectModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerSelectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
