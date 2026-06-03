import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../i18n/language.service';

@Pipe({
  name: 'rial',
  pure: false
})
export class RialPipe implements PipeTransform {
  public constructor(private readonly languageService: LanguageService) {}

  public transform(value: number | string | null | undefined): string {
    if (value === null || value === undefined || value === '') {
      return '';
    }

    const numericValue = this.parseNumericValue(value);
    if (Number.isNaN(numericValue)) {
      return '';
    }

    const locale = this.languageService.currentLanguage === 'fa' ? 'fa-IR' : 'en-US';
    const currencyLabel = this.languageService.currentLanguage === 'fa' ? 'ریال' : 'IRR';
    const formattedValue = new Intl.NumberFormat(locale, {
      maximumFractionDigits: 0,
    }).format(Math.round(numericValue));

    return `${formattedValue} ${currencyLabel}`;
  }

  private parseNumericValue(value: number | string): number {
    if (typeof value === 'number') {
      return value;
    }

    const normalized = value
      .trim()
      .replace(/[۰-۹]/g, (digit) => String(digit.charCodeAt(0) - 0x06f0))
      .replace(/[٠-٩]/g, (digit) => String(digit.charCodeAt(0) - 0x0660))
      .replace(/[٬,]/g, '')
      .replace(/٫/g, '.')
      .replace(/\s+/g, '');

    return Number(normalized);
  }
}
