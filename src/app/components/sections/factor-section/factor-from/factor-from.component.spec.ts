import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactorFromComponent } from './factor-from.component';

describe('FactorFromComponent', () => {
  let component: FactorFromComponent;
  let fixture: ComponentFixture<FactorFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FactorFromComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FactorFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
