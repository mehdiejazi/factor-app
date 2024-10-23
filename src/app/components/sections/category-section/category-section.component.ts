import { Component } from '@angular/core';
import { SettingsService } from '../../../services/settings.service';

@Component({
  selector: 'app-category-section',
  templateUrl: './category-section.component.html',
  styleUrl: './category-section.component.css'
})
export class CategorySectionComponent {

  public constructor(private _settingsService:SettingsService){

    this.settings = _settingsService;

  }

  public settings:SettingsService;

}
