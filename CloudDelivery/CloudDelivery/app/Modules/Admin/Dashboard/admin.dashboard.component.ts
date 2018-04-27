import { Component, OnInit, OnDestroy, Inject, forwardRef } from '@angular/core';
import { OrderCarrier } from '../../../Models/Orders/OrderCarrier';
import { GeoPosition } from '../../../Models/GeoPosition';
import { GMapsService } from '../../../Services/GMapsService';
import { CarrierOrdersService } from '../../../Services/Orders/CarrierOrdersService';
import { ModalFactoryService } from '../../../Services/UI/ModalFactoryService';
import { SalepointOrdersService } from '../../../Services/Orders/SalepointOrdersService';
import { OrderSalepoint } from '../../../Models/Orders/OrderSalepoint';

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin.dashboard.component.html',
    styleUrls: ['./admin.dashboard.component.css']
})

export class AdminDashboardComponent {
    public pendingOrders: OrderCarrier[];

    public baseLocation: GeoPosition;

    public todayCount: number;
    public weekCount: number;
    public monthCount: number;

    constructor(private carrierOrdersService: CarrierOrdersService, private salepointOrdersService: SalepointOrdersService, private gMapsService: GMapsService,
        @Inject(forwardRef(() => ModalFactoryService)) private modalService: ModalFactoryService) {


        this.carrierOrdersService.pendingOrdersChanged.subscribe((list: OrderCarrier[]) => {
            this.pendingOrders = list;
        })

        this.initData();
        this.baseLocation = gMapsService.getBaseLocation();
    }

    async initData() {
        //count
        this.salepointOrdersService.todayCount().subscribe(result => this.todayCount = result);
        this.salepointOrdersService.lastWeekCount().subscribe(result => this.weekCount = result);
        this.salepointOrdersService.lastMonthCount().subscribe(result => this.monthCount = result);

        //list
        await this.carrierOrdersService.pendingList(true).toPromise();
    }

    clickedOrder(order: OrderCarrier) {
        var modal = this.modalService.showModal("OrderDetailsModal");
        modal.content.initOrderDetails(order.Id);
    }
}