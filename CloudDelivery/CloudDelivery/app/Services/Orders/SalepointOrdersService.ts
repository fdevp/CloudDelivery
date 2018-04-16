import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { SessionService } from '../../Services/SessionService'
import { OrdersService } from './OrdersService';
import { OrderEditModel } from '../../Models/Orders/OrderEditModel';
import { OrderSalepoint } from '../../Models/Orders/OrderSalepoint';
import { OrderListItem } from '../../Models/Orders/OrderListItem';
import { OrderStatus } from '../../Models/Enums/OrderStatus';
import { SignalrService } from '../SignalrService';
import { ToastFactoryService } from '../UI/ToastFactoryService';
import { OrdersCountFilters } from '../../Models/Orders/OrdersCountFilters';

@Injectable()
export class SalepointOrdersService extends OrdersService {
    public inProgressOrdersChanged: EventEmitter<OrderSalepoint[]> = new EventEmitter();
    public addedOrdersChanged: EventEmitter<OrderSalepoint[]> = new EventEmitter();

    private inProgressOrders: OrderSalepoint[] = new Array<OrderSalepoint>();
    private addedOrders: OrderSalepoint[] = new Array<OrderSalepoint>();

    constructor(protected http: Http, protected sessionService: SessionService, private signalrService: SignalrService, private toastsService: ToastFactoryService) {
        super(http, sessionService);
        this.setWebsocketsEventsHandlers();
    }

    removeOrderFromInProgressList(orderId: number) {
        var orderIndex = this.inProgressOrders.findIndex(x => x.Id == orderId);
        if (orderIndex < 0)
            return;
        this.inProgressOrders.splice(orderIndex, 1);
        this.inProgressOrdersChanged.emit(this.inProgressOrders);
    }

    removeOrderFromAddedList(orderId: number) {
        var orderIndex = this.addedOrders.findIndex(x => x.Id == orderId);
        if (orderIndex < 0)
            return;
        this.addedOrders.splice(orderIndex, 1);
        this.addedOrdersChanged.emit(this.addedOrders);
    }

    changeOrderStatus(orderId: number, status: OrderStatus) {
        var orderIndex = this.addedOrders.findIndex(x => x.Id == orderId);
        if (orderIndex < 0)
            return;
        this.addedOrders[orderIndex].Status = status;
    }

    add(order: OrderEditModel): Observable<Array<OrderListItem>> {
        var headers = this.sessionService.authHeader();
        return new Observable((obs: Observer<Array<OrderListItem>>) => {
            return this.http.post('/api/orders/add', order, { headers: headers }).subscribe(data => {
                var body = JSON.parse(data["_body"]);

                this.addedOrders.push(body);
                this.addedOrdersChanged.emit(this.addedOrders);
                this.countersIncrease.emit();

                obs.next(body);
            }, e => { console.error("err", e); })
        });
    };

    cancel(inprogress: boolean, orderId: number): Observable<boolean> {
        var headers = this.sessionService.authHeader();
        var url = '/api/orders/cancel/' + orderId;
        return new Observable((obs: Observer<boolean>) => {
            return this.http.put(url, { headers: headers }).subscribe(data => {

                if (inprogress)
                    this.removeOrderFromInProgressList(orderId);
                else
                    this.removeOrderFromAddedList(orderId);

            }, e => { console.error("err", e); })
        });
    };

    addedList(refresh): Observable<Array<OrderSalepoint>> {
        if (this.addedList != null && refresh == false) {
            return Observable.of(this.addedOrders);
        }

        var headers = this.sessionService.authHeader();
        return new Observable((obs: Observer<Array<OrderSalepoint>>) => {
            return this.http.get('/api/orders/AddedList', { headers: headers }).subscribe(data => {

                var body = JSON.parse(data["_body"]);
                this.getLocationArray(body);
                this.addedOrders = body;

                this.addedOrdersChanged.emit(this.addedOrders);
                obs.next(body);

            }, e => { console.error("err", e); })
        });
    };

    inProgressList(refresh: boolean): Observable<Array<OrderSalepoint>> {
        if (this.inProgressOrders != null && refresh == false) {
            return Observable.of(this.inProgressOrders);
        }

        var headers = this.sessionService.authHeader();
        return new Observable((obs: Observer<Array<OrderSalepoint>>) => {
            return this.http.get('/api/orders/InProgressList', { headers: headers }).subscribe(data => {

                var body = JSON.parse(data["_body"]);
                this.getLocationArray(body);
                this.inProgressOrders = body;

                this.inProgressOrdersChanged.emit(this.inProgressOrders);
                obs.next(body);

            }, e => { console.error("err", e); })
        });
    };

    todayCount(): Observable<number> {
        var filters = new OrdersCountFilters();
        var today = new Date();
        filters.AddedTimeStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1).toDateString();

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
        filters.AddedTimeStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7).toDateString();

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
        filters.AddedTimeStart = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate()).toDateString();

        var headers = this.sessionService.authHeader();

        return new Observable((obs: Observer<number>) => {
            return this.http.get('/api/orders/Count', { headers: headers, params: filters }).subscribe(data => {
                obs.next(+data["_body"]);
            }, e => { console.error("err", e); })
        });
    }

    private setWebsocketsEventsHandlers() {
        this.signalrService.salepointOrderAccepted.subscribe(order => this.websocketOrderAccepted(order));
        this.signalrService.salepointOrderDelivered.subscribe(orderId => this.websocketOrderDelivered(orderId));
        this.signalrService.salepointOrderPickedUp.subscribe(orderId => this.websocketOrderPickedUp(orderId));
    }

    private websocketOrderAccepted(order: OrderSalepoint) {
        this.toastsService.toastr.info("Do: " + order.DestinationAddress + `
Kierowca: ` + order.CarrierName, "Zaakceptowano zamówienie");
        this.getLocationObject(order);

        var addedOrderIndex = this.addedOrders.findIndex(x => x.Id == order.Id);

        if (addedOrderIndex >= 0) {
            this.addedOrders.splice(addedOrderIndex, 1);
            this.addedOrdersChanged.emit(this.addedOrders);
        }

        this.inProgressOrders.push(order);
        this.inProgressOrdersChanged.emit(this.inProgressOrders);
    }

    private websocketOrderDelivered(orderId: number) {
        var orderIndex = this.inProgressOrders.findIndex(x => x.Id == orderId);
        if (orderIndex < 0)
            return;


        var message = "Do: " + this.inProgressOrders[orderIndex].DestinationAddress;
        this.toastsService.toastr.info(message, "Kierowca dostarczył zamówienie.");

        this.inProgressOrders.splice(orderIndex, 1);
        this.inProgressOrdersChanged.emit(this.inProgressOrders);
    }

    private websocketOrderPickedUp(orderId: number) {
        var orderIndex = this.inProgressOrders.findIndex(x => x.Id == orderId);
        if (orderIndex < 0)
            return;

        this.inProgressOrders[orderIndex].Status = OrderStatus.InDelivery;
        this.inProgressOrdersChanged.emit(this.inProgressOrders);
    }

}