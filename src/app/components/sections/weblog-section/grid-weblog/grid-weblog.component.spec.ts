import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridWeblogComponent } from './grid-weblog.component';

describe('GridWeblogComponent', () => {
  let component: GridWeblogComponent;
  let fixture: ComponentFixture<GridWeblogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridWeblogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridWeblogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
