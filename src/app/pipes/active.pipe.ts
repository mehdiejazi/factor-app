import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'active' })
export class ActivePipe implements PipeTransform {
    public transform(isActive: boolean): string {
        
        if (isActive)
            return 'فعال';
        else
            return 'غیر فعال';
    }
}