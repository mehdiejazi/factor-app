import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersianDateModalComponent } from './persian-date-modal.component';

describe('PersianDateModalComponent', () => {
  let component: PersianDateModalComponent;
  let fixture: ComponentFixture<PersianDateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersianDateModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersianDateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
