import { Pipe, PipeTransform } from '@angular/core';
import { OrderStatus } from '../../../Models/Enums/OrderStatus'

@Pipe({ name: 'durationText' })
export class DurationTextPipe implements PipeTransform {
    constructor() {

    }

    transform(value: OrderStatus) {
        if (value == null)
            return "-"
        return value + "min";
    }
}