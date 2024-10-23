import { Component } from '@angular/core';
import { SettingsService } from '../../../services/settings.service';

@Component({
  selector: 'app-product-section',
  templateUrl: './product-section.component.html',
  styleUrl: './product-section.component.css'
})
export class ProductSectionComponent {

  public settings:SettingsService;

  public constructor(private _settingsService: SettingsService){
    this.settings = _settingsService;
  }

}
