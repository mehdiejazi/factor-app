import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWeblogComponent } from './view-weblog.component';

describe('ViewWeblogComponent', () => {
  let component: ViewWeblogComponent;
  let fixture: ComponentFixture<ViewWeblogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewWeblogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewWeblogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
