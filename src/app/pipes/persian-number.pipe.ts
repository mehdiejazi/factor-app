import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'persianNumber'
})
export class PersianNumberPipe implements PipeTransform {
  private readonly persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

  transform(value: number | string | null | undefined): string {
    if (value === null || value === undefined) {
      return '';
    }

    return String(value)
      .replace(/[0-9]/g, (digit) => this.persianDigits[Number(digit)])
      .replace(/[٠-٩]/g, (digit) => this.persianDigits[digit.charCodeAt(0) - 0x0660])
      .replace(/,/g, '٬')
      .replace(/\./g, '٫');
  }
}
