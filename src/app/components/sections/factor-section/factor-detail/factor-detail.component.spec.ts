import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactorDetailComponent } from './factor-detail.component';

describe('FactorDetailComponent', () => {
  let component: FactorDetailComponent;
  let fixture: ComponentFixture<FactorDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FactorDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FactorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
