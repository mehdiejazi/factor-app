import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../i18n/language.service';

@Pipe({
  name: 'persianNumber',
  pure: false
})
export class PersianNumberPipe implements PipeTransform {
  private readonly persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  private readonly englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  public constructor(private readonly languageService: LanguageService) {}

  public transform(value: number | string | null | undefined): string {
    if (value === null || value === undefined) {
      return '';
    }

    const normalizedValue = String(value)
      .replace(/[۰-۹]/g, (digit) => this.englishDigits[digit.charCodeAt(0) - 0x06f0])
      .replace(/[٠-٩]/g, (digit) => this.englishDigits[digit.charCodeAt(0) - 0x0660]);

    if (this.languageService.currentLanguage === 'en') {
      return normalizedValue
        .replace(/٬/g, ',')
        .replace(/٫/g, '.');
    }

    return normalizedValue
      .replace(/[0-9]/g, (digit) => this.persianDigits[Number(digit)])
      .replace(/[٠-٩]/g, (digit) => this.persianDigits[digit.charCodeAt(0) - 0x0660])
      .replace(/,/g, '٬')
      .replace(/\./g, '٫');
  }
}
