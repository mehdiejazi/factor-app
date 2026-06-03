import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';

import { RoleListComponent } from './role-list.component';
import { RoleService } from '../../../../services/role.service';

describe('RoleListComponent', () => {
  let component: RoleListComponent;
  let fixture: ComponentFixture<RoleListComponent>;

  const roleServiceStub = {
    getAllAsync: jasmine.createSpy('getAllAsync').and.returnValue(of({ isSuccessful: true, data: [] }))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoleListComponent],
      providers: [
        { provide: BsModalService, useValue: {} },
        { provide: RoleService, useValue: roleServiceStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
