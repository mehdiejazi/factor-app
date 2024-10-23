import { Component } from '@angular/core';
import { SettingsService } from '../../../services/settings.service';

@Component({
  selector: 'app-customer-section',
  templateUrl: './customer-section.component.html',
  styleUrl: './customer-section.component.css'
})
export class CustomerSectionComponent {

  public settings:SettingsService;

  public constructor(private _settingService: SettingsService){

    this.settings = _settingService;

  }

}
