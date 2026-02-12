import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rial'
})
export class RialPipe implements PipeTransform {
  private readonly rialLabel = '\u0631\u06cc\u0627\u0644';
  private readonly locale = 'fa-IR';

  transform(value: number | string | null | undefined): string {
    if (value === null || value === undefined || value === '') {
      return '';
    }

    const numericValue = this.parseNumericValue(value);
    if (Number.isNaN(numericValue)) {
      return '';
    }

    const formattedValue = new Intl.NumberFormat(this.locale, {
      maximumFractionDigits: 0,
    }).format(Math.round(numericValue));

    return `${formattedValue} ${this.rialLabel}`;
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
