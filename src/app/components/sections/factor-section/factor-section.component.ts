import { Component } from '@angular/core';
import { SettingsService } from '../../../services/settings.service';

@Component({
  selector: 'app-factor-section',
  templateUrl: './factor-section.component.html',
  styleUrl: './factor-section.component.css'
})
export class FactorSectionComponent {

  public settings:SettingsService

  public constructor(private _settingsService:SettingsService){

    this.settings = _settingsService;
    
  }

}
