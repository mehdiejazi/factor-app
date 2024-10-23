import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageAssetSelectModalComponent } from './image-asset-select-modal.component';

describe('ImageAssetSelectModalComponent', () => {
  let component: ImageAssetSelectModalComponent;
  let fixture: ComponentFixture<ImageAssetSelectModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImageAssetSelectModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImageAssetSelectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
