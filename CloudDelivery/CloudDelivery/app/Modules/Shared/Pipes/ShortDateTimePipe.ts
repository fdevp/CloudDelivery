import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({ name: 'shortDateTime' })
export class ShortDateTimePipe extends DatePipe implements PipeTransform {
    transform(value: Date) {
        if (value == null)
            return "-"; 
        return super.transform(value, "dd/MM/yyyy, HH:mm")
    }
}