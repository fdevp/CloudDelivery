import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({ name: 'shortDateTime' })
export class ShortDateTimePipe extends DatePipe implements PipeTransform {
    transform(value: Date) {
        return super.transform(value, "dd/MM/yyyy, HH:mm")
    }
}