import { Pipe, PipeTransform } from '@angular/core';
import { OrderStatus } from '../../../Models/Enums/OrderStatus'

@Pipe({ name: 'orderStatus' })
export class OrderStatusPipe implements PipeTransform {
    constructor() {

    }

    transform(value: OrderStatus) {
        var name = "";
        switch (value) {
            case OrderStatus.Accepted:
                name = "Zaakceptowano";
                break;
            case OrderStatus.Added:
                name = "Dodano";
                break;
            case OrderStatus.Cancelled:
                name = "Anulowano";
                break;
            case OrderStatus.Delivered:
                name = "Dostarczono";
                break;
            case OrderStatus.InDelivery:
                name = "W trakcie dostawy";
                break;
        }
        return name;
    }
}