import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { OrderListItem } from '../../Models/Orders/OrderListItem'
import { OrdersListFilters } from '../../Models/Orders/OrdersListFilters'
import { OrderSalepoint } from '../../Models/Orders/OrderSalepoint'
import { OrderDetails } from '../../Models/Orders/OrderDetails'

import { SessionService } from '../../Services/SessionService'
import { OrderEditModel } from '../../Models/Orders/OrderEditModel';
import { OrdersCountFilters } from '../../Models/Orders/OrdersCountFilters';


export class OrdersService {
    public countersIncrease: EventEmitter<any> = new EventEmitter();

    constructor(protected http: Http, protected sessionService: SessionService) {

    }

    list(filters: OrdersListFilters): Observable<Array<OrderListItem>> {
        var headers = this.sessionService.authHeader();
        headers.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
        var body = "=" + JSON.stringify(filters);;
        return new Observable((obs: Observer<Array<OrderListItem>>) => {
            return this.http.get('/api/orders/list', { headers: headers }).subscribe(data => {
                var body = JSON.parse(data["_body"]);
                console.warn("lista orders", body);
                obs.next(body);
            }, e => { console.error("err", e); })
        });
    };

    details(orderId): Observable<OrderDetails> {
        var headers = this.sessionService.authHeader();

        var path = '/api/orders/details/' + orderId; 

        return new Observable((obs: Observer<OrderDetails>) => {
            return this.http.get(path, { headers: headers }).subscribe(data => {
                var body = JSON.parse(data["_body"]);
                this.getLocationObject(body);
                obs.next(body);
            }, e => { console.error("err", e); })
        });
    };

   
    discard(orderId): Observable<boolean> {
        var headers = this.sessionService.authHeader();
        return new Observable((obs: Observer<boolean>) => {
            return this.http.get('/api/orders/discard', { headers: headers }).subscribe(data => {
                var body = JSON.parse(data["_body"]);
                obs.next(body);
            }, e => { console.error("err", e); })
        });
    };

    protected getLocationArray(orders: any) {
        for (var i = 0; i < orders.length; i++) {

            var order = orders[i];

            //endlatlng
            if (order.EndLatLng == "" || order.EndLatLng == null)
                continue;
            try {
                order.EndLatLng = JSON.parse(order.EndLatLng);
            } catch (ex) { console.warn("err,", ex); }

            //salepoint
            if (order.SalepointLatLng == "" || order.SalepointLatLng == null)
                continue;
            try {
                order.SalepointLatLng = JSON.parse(order.SalepointLatLng);
            } catch (ex) { console.warn("err,", ex); }

        }
    }

    protected getLocationObject(order: any) {
        if (order.EndLatLng != null) {

            try {
                order.EndLatLng = JSON.parse(order.EndLatLng);
            } catch (ex) { console.warn("err,", ex); }

        }

        if (order.SalepointLatLng != null) {

            try {
                order.SalepointLatLng = JSON.parse(order.SalepointLatLng);
            } catch (ex) { console.warn("err,", ex); }

        }

    }
}