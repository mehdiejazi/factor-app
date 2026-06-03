import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeblogViewComponent } from './weblog-view.component';

describe('WeblogViewComponent', () => {
  let component: WeblogViewComponent;
  let fixture: ComponentFixture<WeblogViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeblogViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeblogViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
