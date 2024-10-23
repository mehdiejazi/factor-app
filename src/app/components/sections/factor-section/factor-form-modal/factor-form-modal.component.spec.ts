import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactorFormModalComponent } from './factor-form-modal.component';

describe('FactorFormModalComponent', () => {
  let component: FactorFormModalComponent;
  let fixture: ComponentFixture<FactorFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FactorFormModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FactorFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
