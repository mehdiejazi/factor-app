import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rial'
})
export class RialPipe implements PipeTransform {

  transform(value: number): string {
    // تبدیل عدد به رشته با جدا کردن هر سه رقم با کاما
    const formattedValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // return formattedValue    // اضافه کردن واحد پول به رشته
    return formattedValue + ' ریال';
  }

}
