import { Component, OnInit, OnDestroy, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { OrdersService } from '../../../Services/Orders/OrdersService';
import { Router } from '@angular/router';
import { OrderListItem } from '../../../Models/Orders/OrderListItem'
import { OrdersListFilters } from '../../../Models/Orders/OrdersListFilters';
import { OrderStatusPipe } from '../../Shared/pipes/OrderStatusPipe'
import { ShortDateTimePipe } from '../../Shared/pipes/ShortDateTimePipe'
import { ModalFactoryService } from '../../../Services/UI/ModalFactoryService';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
    selector: 'app-admin-orders',
    templateUrl: './admin.orders.component.html'
})

export class AdminOrdersComponent {

    public selected = [];
    public orders: Array<OrderListItem> = [];
    public filters: OrdersListFilters = new OrdersListFilters();
    public initialized: boolean = false;

    columns = [
        { prop: 'Id' },
        { prop: 'DestinationAddress', name: 'Miejsce dowozu' },
        { prop: 'SalepointName', name: 'Punkt sprzedaży' },
        { prop: 'CarrierName', name: 'Kierowca' },
        { prop: 'AddedTime', name: 'Dodano', pipe: new ShortDateTimePipe("pl-PL") },
        { prop: 'AddedTime', name: 'Dostarczono', pipe: new ShortDateTimePipe("pl-PL") },
        { prop: 'Status', name: 'Status', pipe: new OrderStatusPipe() }
    ];

    constructor(private ordersService: OrdersService, private router: Router, private modalService: ModalFactoryService, private cdr: ChangeDetectorRef) {
        this.initializeOrdersList();
    }

    public initializeOrdersList(): void {
        this.ordersService.list(this.filters).subscribe(usersList => {
            this.orders = usersList;
            this.initialized = true;
        }); 
    }

    public orderSelect({ selected }) {
        var obj = this;
        var modal = this.modalService.showModal("OrderDetailsModal", { class: "modal-lg" });
        modal.content.initOrderDetails(selected[0].Id);

        this.modalService.onModalHide.subscribe(event => {
            obj.selected = [];
            obj.cdr.detectChanges();
        });
    }
}