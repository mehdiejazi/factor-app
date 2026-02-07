import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeblogSectionComponent } from './weblog-section.component';

describe('WeblogSectionComponent', () => {
  let component: WeblogSectionComponent;
  let fixture: ComponentFixture<WeblogSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeblogSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeblogSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
