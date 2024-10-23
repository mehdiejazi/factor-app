import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageAssetSectionComponent } from './image-asset-section.component';

describe('ImageDataSectionComponent', () => {
  let component: ImageAssetSectionComponent;
  let fixture: ComponentFixture<ImageAssetSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageAssetSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageAssetSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
