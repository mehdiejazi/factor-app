import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleFormModalComponent } from './role-form-modal.component';

describe('RoleFormModalComponent', () => {
  let component: RoleFormModalComponent;
  let fixture: ComponentFixture<RoleFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoleFormModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
