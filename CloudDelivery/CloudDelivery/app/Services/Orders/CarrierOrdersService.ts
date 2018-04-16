import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { SessionService } from '../../Services/SessionService'
import { OrdersService } from './OrdersService';
import { OrderEditModel } from '../../Models/Orders/OrderEditModel';
import { OrderSalepoint } from '../../Models/Orders/OrderSalepoint';
import { OrderListItem } from '../../Models/Orders/OrderListItem';
import { OrderCarrier } from '../../Models/Orders/OrderCarrier';
import { SignalrService } from '../SignalrService';
import { ToastFactoryService } from '../UI/ToastFactoryService';
import { OrdersCountFilters } from '../../Models/Orders/OrdersCountFilters';

@Injectable()
export class CarrierOrdersService extends OrdersService {
    public pendingOrdersChanged: EventEmitter<OrderCarrier[]> = new EventEmitter();

    private pendingOrders: OrderCarrier[];

    constructor(protected http: Http, protected sessionService: SessionService, private signalrService: SignalrService, private toastsService: ToastFactoryService) {
        super(http, sessionService);
        this.setWebsocketsEventsHandlers();
    }

    pendingList(refresh: boolean): Observable<Array<OrderCarrier>> {
        if (this.pendingOrders != null && refresh == false) {
            return Observable.of(this.pendingOrders);
        }

        var headers = this.sessionService.authHeader();
        return new Observable((obs: Observer<Array<OrderCarrier>>) => {
            return this.http.get('/api/orders/PendingList', { headers: headers }).subscribe(data => {

                var body = JSON.parse(data["_body"]);
                this.getLocationArray(body);
                this.pendingOrders = body;

                this.pendingOrdersChanged.emit(this.pendingOrders);
                obs.next(body);

            }, e => { console.error("err", e); })
        });
    };

    private setWebsocketsEventsHandlers() {
        this.signalrService.carrierOrderAccepted.subscribe(orderId => this.websocketOrderAccepted(orderId));
        this.signalrService.carrierOrderAdded.subscribe(order => this.websocketOrderAdded(order));
        this.signalrService.carrierOrderCancelled.subscribe(orderId => this.websocketOrderCancelled(orderId));
    }

    private websocketOrderAccepted(orderId: number) {
        var orderIndex = this.pendingOrders.findIndex(x => x.Id == orderId);
        if (orderIndex < 0)
            return;

        this.pendingOrders.splice(orderIndex, 1);
        this.pendingOrdersChanged.emit(this.pendingOrders);
    }

    private websocketOrderCancelled(orderId: number) {
        var orderIndex = this.pendingOrders.findIndex(x => x.Id == orderId);
        if (orderIndex < 0)
            return;

        this.pendingOrders.splice(orderIndex, 1);
        this.pendingOrdersChanged.emit(this.pendingOrders);
    }

    private websocketOrderAdded(order: OrderCarrier) {
        this.toastsService.toastr.info("Do: " + order.DestinationAddress, "Dodano zamówienie");
        this.getLocationObject(order);
        this.pendingOrders.push(order);
        this.pendingOrdersChanged.emit(this.pendingOrders);
    }


    todayCount(): Observable<number> {
        var filters = new OrdersCountFilters();
        var today = new Date();
        filters.AcceptedTimeStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1).toDateString();

        var headers = this.sessionService.authHeader();

        return new Observable((obs: Observer<number>) => {
            return this.http.get('/api/orders/Count', { headers: headers, params: filters }).subscribe(data => {
                obs.next(+data["_body"]);
            }, e => { console.error("err", e); })
        });

    }

    lastWeekCount(): Observable<number> {
        var filters = new OrdersCountFilters();
        var today = new Date();
        filters.AcceptedTimeStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7).toDateString();

        var headers = this.sessionService.authHeader();

        return new Observable((obs: Observer<number>) => {
            return this.http.get('/api/orders/Count', { headers: headers, params: filters }).subscribe(data => {
                obs.next(+data["_body"]);
            }, e => { console.error("err", e); })
        });
    }

    lastMonthCount(): Observable<number> {
        var filters = new OrdersCountFilters();
        var today = new Date();
        filters.AcceptedTimeStart = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate()).toDateString();

        var headers = this.sessionService.authHeader();

        return new Observable((obs: Observer<number>) => {
            return this.http.get('/api/orders/Count', { headers: headers, params: filters }).subscribe(data => {
                obs.next(+data["_body"]);
            }, e => { console.error("err", e); })
        });
    }

}