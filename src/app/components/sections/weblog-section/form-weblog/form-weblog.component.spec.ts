import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormWeblogComponent } from './form-weblog.component';

describe('FormWeblogComponent', () => {
  let component: FormWeblogComponent;
  let fixture: ComponentFixture<FormWeblogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormWeblogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormWeblogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
