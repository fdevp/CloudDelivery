import { Pipe, PipeTransform } from '@angular/core';
import { OrderStatus } from '../../../Models/Enums/OrderStatus'

@Pipe({ name: 'currencyText' })
export class CurrencyTextPipe implements PipeTransform {
    constructor() {

    }

    transform(value: OrderStatus) {
        if (value == null)
            return "-"
        return value + "zł";
    }
}