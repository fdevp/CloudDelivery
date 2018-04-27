import { Component, OnInit, OnDestroy, Inject, forwardRef } from '@angular/core';
import { OrderSalepoint } from '../../../Models/Orders/OrderSalepoint';
import { OrdersService } from '../../../Services/Orders/OrdersService';
import { GMapsService } from '../../../Services/GMapsService';
import { GeoPosition } from '../../../Models/GeoPosition';
import { OrderStatus } from '../../../Models/Enums/OrderStatus';
import { ToastFactoryService } from '../../../Services/UI/ToastFactoryService';
import { ModalFactoryService } from '../../../Services/UI/ModalFactoryService';
import { SalepointOrdersService } from '../../../Services/Orders/SalepointOrdersService';

@Component({
    selector: 'app-salepoint-dashboard',
    templateUrl: './salepoint.dashboard.component.html',
    styleUrls: ['./salepoint.dashboard.component.css']
})

export class SalepointDashboardComponent {
    public inProgressOrders: OrderSalepoint[];
    public addedOrders: OrderSalepoint[];
    public baseLocation: GeoPosition;


    public orderStatusEnum = OrderStatus;
    public activeInProgressTab: boolean = true;

    public todayCount: number;
    public weekCount: number;
    public monthCount: number;

    constructor(private ordersService: SalepointOrdersService, private gMapsService: GMapsService,
        @Inject(forwardRef(() => ModalFactoryService)) private modalService: ModalFactoryService) {

        this.ordersService.addedOrdersChanged.subscribe((list: OrderSalepoint[]) => {
            this.addedOrders = list;
        });

        this.ordersService.inProgressOrdersChanged.subscribe((list: OrderSalepoint[]) => {
            this.inProgressOrders = list;
        })

        this.ordersService.countersIncrease.subscribe(() => {
            this.todayCount++;
            this.weekCount++;
            this.monthCount++;
        });

        this.initData();
        this.baseLocation = gMapsService.getBaseLocation();
    }

    setActiveTab(inProgressTab: boolean) {
        if (inProgressTab)
            this.activeInProgressTab = true;
        else
            this.activeInProgressTab = false;
    }

    async initData() {
         //count
        this.ordersService.todayCount().subscribe(result => this.todayCount = result);
        this.ordersService.lastWeekCount().subscribe(result => this.weekCount = result);
        this.ordersService.lastMonthCount().subscribe(result => this.monthCount = result);

        //list
        await Promise.all([this.ordersService.addedList(true).toPromise(), this.ordersService.inProgressList(true).toPromise()]);
       

    }

    

    clickedOrder(order: OrderSalepoint) {
        var modal = this.modalService.showModal("OrderDetailsModal");
        modal.content.initOrderDetails(order.Id);
    }

    cancelOrder(order) {
        this.modalService.ConfirmModal("Czy na pewno anulować zamówienie do " + order.DestinationCity + ", " + order.DestinationAddress + "?").subscribe(confirmation => {
            if (!confirmation)
                return;
        })
    }

    selectIcon(order: OrderSalepoint): any {
        if (order.Status == OrderStatus.Added)
            return this.gMapsService.getMarkerBwIcon();
        else
            return this.gMapsService.getMarkerIcon();
    }


}