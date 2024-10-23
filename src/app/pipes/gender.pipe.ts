import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'gender' })
export class GenderPipe implements PipeTransform {
    public transform(gender: number): string {
        
        if (gender * 1 === 0)
            return 'مرد';
        else if (gender * 1 === 1)
            return 'زن';
        else
            return 'نا مشخص';
    }
}