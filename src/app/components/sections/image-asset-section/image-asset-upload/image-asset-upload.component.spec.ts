import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageAssetUploadComponent } from './image-asset-upload.component';

describe('ImageDataUploadComponent', () => {
  let component: ImageAssetUploadComponent;
  let fixture: ComponentFixture<ImageAssetUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageAssetUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageAssetUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
