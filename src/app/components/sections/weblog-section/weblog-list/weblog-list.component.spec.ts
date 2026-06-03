import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeblogListComponent } from './weblog-list.component';

describe('WeblogListComponent', () => {
  let component: WeblogListComponent;
  let fixture: ComponentFixture<WeblogListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeblogListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeblogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
