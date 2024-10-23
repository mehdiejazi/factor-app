import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactorSectionComponent } from './factor-section.component';

describe('FactorSectionComponent', () => {
  let component: FactorSectionComponent;
  let fixture: ComponentFixture<FactorSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FactorSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FactorSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
