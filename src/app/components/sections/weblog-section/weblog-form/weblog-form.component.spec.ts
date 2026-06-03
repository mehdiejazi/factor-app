import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeblogFormComponent } from './weblog-form.component';

describe('WeblogFormComponent', () => {
  let component: WeblogFormComponent;
  let fixture: ComponentFixture<WeblogFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeblogFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeblogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
