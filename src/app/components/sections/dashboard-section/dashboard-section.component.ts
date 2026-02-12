import { Component } from '@angular/core';
import { SettingsService } from '../../../services/settings.service';

@Component({
  selector: 'app-dashboard-section',
  templateUrl: './dashboard-section.component.html',
  styleUrl: './dashboard-section.component.css'
})
export class DashboardSectionComponent {
  public settings: SettingsService;
  constructor(_settings: SettingsService) {
    this.settings = _settings;
  }
}
