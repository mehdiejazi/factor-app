import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '../../../services/settings.service';

@Component({
  selector: 'app-weblog-section',
  templateUrl: './weblog-section.component.html',
  styleUrls: ['./weblog-section.component.css']
})
export class WeblogSectionComponent implements OnInit {


  public settingsService: SettingsService;
  public constructor(private _router: Router, private _settingsService: SettingsService) {

    this.settingsService = _settingsService;

  }

  public ngOnInit(): void { }


  public addNewPost() {
  
    this._router.navigate(['/weblog/form'], { queryParams: {} });
  
  }
  public viewGrid() {

    this._router.navigate(['/weblog/grid'], { queryParams: {} });
  
  }
}