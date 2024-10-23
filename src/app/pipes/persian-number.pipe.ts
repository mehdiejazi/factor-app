import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'persianNumber'
})
export class PersianNumberPipe implements PipeTransform {
  numbersObject: { [x: string]: string } = {
      '1': '١',
      '2': '٢',
      '3': '٣',
      '4': '۴',
      '5': '۵',
      '6': '۶',
      '7': '٧',
      '8': '٨',
      '9': '٩',
      '0': '۰',
    };

  public transform(n: number | string): string {
      if (n === null || n === undefined) return '';
      n = n + ''; // to make it a string if it was a number 
      let newString = '';
      for (let i = 0; i < n.length; i++) {
        if (this.numbersObject[n.charAt(i)])
          newString += this.numbersObject[n.charAt(i)];
        else
          newString += n.charAt(i);
      }
  
      return newString;
    }
}
