import { Component, OnInit, OnDestroy, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { OrderListItem } from '../../../Models/Orders/OrderListItem'
import { OrdersListFilters } from '../../../Models/Orders/OrdersListFilters';
import { OrderStatusPipe } from '../../Shared/pipes/OrderStatusPipe'
import { ShortDateTimePipe } from '../../Shared/pipes/ShortDateTimePipe'
import { ModalFactoryService } from '../../../Services/UI/ModalFactoryService';
import { CarrierOrdersService } from '../../../Services/Orders/CarrierOrdersService';

@Component({
    selector: 'app-carrier-routes',
    templateUrl: './carrier.routes.component.html'
})

export class CarrierRoutesComponent {

    public selected = [];
    public orders: Array<OrderListItem> = [];
    public filters: OrdersListFilters = new OrdersListFilters();
    public initialized: boolean = false;

    columns = [
        { prop: 'Id' },
        { prop: 'DestinationAddress', name: 'Miejsce dowozu' },
        { prop: 'CarrierName', name: 'Kierowca' },
        { prop: 'AddedTime', name: 'Dodano', pipe: new ShortDateTimePipe("pl-PL") },
        { prop: 'AddedTime', name: 'Dostarczono', pipe: new ShortDateTimePipe("pl-PL") },
        { prop: 'Status', name: 'Status', pipe: new OrderStatusPipe() }
    ];

    constructor(private ordersService: CarrierOrdersService, private router: Router, private modalService: ModalFactoryService, private cdr: ChangeDetectorRef) {
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