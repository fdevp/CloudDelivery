import { Component, OnInit, OnDestroy, Inject, forwardRef } from '@angular/core';
import { OrderCarrier } from '../../../Models/Orders/OrderCarrier';
import { GeoPosition } from '../../../Models/GeoPosition';
import { ModalFactoryService } from '../../../Services/UI/ModalFactoryService';
import { CarrierOrdersService } from '../../../Services/Orders/CarrierOrdersService';
import { GMapsService } from '../../../Services/GMapsService';
import { OrderSalepoint } from '../../../Models/Orders/OrderSalepoint';

@Component({
    selector: 'app-carrier-dashboard',
    templateUrl: './carrier.dashboard.component.html',
    styleUrls: ['./carrier.dashboard.component.css']
})

export class CarrierDashboardComponent {
    public pendingOrders: OrderCarrier[];

    public baseLocation: GeoPosition;

    public todayCount: number;
    public weekCount: number;
    public monthCount: number;

    constructor(private ordersService: CarrierOrdersService, private gMapsService: GMapsService,
        @Inject(forwardRef(() => ModalFactoryService)) private modalService: ModalFactoryService) {

        this.ordersService.pendingOrdersChanged.subscribe((list: OrderCarrier[]) => {
            this.pendingOrders = list;
        })

        this.initData();
        this.baseLocation = gMapsService.getBaseLocation();
    }

    async initData() {
        //count
        this.ordersService.todayCount().subscribe(result => this.todayCount = result);
        this.ordersService.lastWeekCount().subscribe(result => this.weekCount = result);
        this.ordersService.lastMonthCount().subscribe(result => this.monthCount = result);

        //list
        await this.ordersService.pendingList(true).toPromise();
    }

    clickedOrder(order: OrderCarrier) {
        var modal = this.modalService.showModal("OrderDetailsModal");
        modal.content.initOrderDetails(order.Id);
    }

}