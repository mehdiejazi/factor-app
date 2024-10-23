import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactorItemFormModalComponent } from './factor-item-form-modal.component';

describe('FactorItemFormModalComponent', () => {
  let component: FactorItemFormModalComponent;
  let fixture: ComponentFixture<FactorItemFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FactorItemFormModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FactorItemFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
