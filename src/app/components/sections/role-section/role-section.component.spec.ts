import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleSectionComponent } from './role-section.component';

@Component({ selector: 'app-role-list', template: '' })
class MockRoleListComponent {}

@Component({ selector: 'app-section-header', template: '' })
class MockSectionHeaderComponent {}

describe('RoleSectionComponent', () => {
  let component: RoleSectionComponent;
  let fixture: ComponentFixture<RoleSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RoleSectionComponent,
        MockRoleListComponent,
        MockSectionHeaderComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
