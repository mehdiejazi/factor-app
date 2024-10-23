import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreSectionComponent } from './store-section.component';

describe('StoreSectionComponent', () => {
  let component: StoreSectionComponent;
  let fixture: ComponentFixture<StoreSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StoreSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StoreSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
