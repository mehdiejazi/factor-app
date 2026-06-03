import { Component } from '@angular/core';
import { AppLanguage, LanguageService } from './i18n/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public constructor(public readonly languageService: LanguageService) {}

  public setLanguage(language: AppLanguage): void {
    this.languageService.setLanguage(language);
  }
}
