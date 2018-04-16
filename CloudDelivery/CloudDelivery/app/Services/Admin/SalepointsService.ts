import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { SessionService } from '../../Services/SessionService'
import 'rxjs/add/observable/of';
import 'rxjs/Rx';
import { SalePoint } from '../../Models/SalePoints/SalePoint';

@Injectable()
export class SalePointsService {
    constructor(private http: Http, private sessionService: SessionService) {

    }

    list(): Observable<Array<SalePoint>> {
        var headers = this.sessionService.authHeader();
        return new Observable((obs: Observer<Array<SalePoint>>) => {
            return this.http.get('/api/SalePoints/list', { headers: headers }).subscribe(data => {
                var body = JSON.parse(data["_body"]);
                obs.next(body);
            }, e => { console.error("err", e); })
        });
    }

    listOrg(orgId): Observable<SalePoint> {
        var headers = this.sessionService.authHeader();
        var url = '/api/SalePoints/details/' + orgId;
        return new Observable((obs: Observer<SalePoint>) => {
            return this.http.get(url, { headers: headers }).subscribe(data => {
                var body = JSON.parse(data["_body"]);
                obs.next(body);
            })
        });
    }

    details(userId): Observable<SalePoint> {
        var headers = this.sessionService.authHeader();
        var url = '/api/SalePoints/details/' + userId;
        return new Observable((obs: Observer<SalePoint>) => {
            return this.http.get(url, { headers: headers }).subscribe(data => {
                var sp: SalePoint = JSON.parse(data["_body"]);
                obs.next(sp);
            })
        });
    }

    setCity(userId, city): Observable<boolean> {
        var headers = this.sessionService.authHeader();
        headers.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
        var body = "=" + city;
        var url = '/api/SalePoints/city/' + userId;
        return new Observable((obs: Observer<boolean>) => {
            return this.http.put(url, body, { headers: headers }).subscribe(data => {
                obs.next(true);
            })
        });
    }


    setAddress(userId, address): Observable<boolean> {
        var headers = this.sessionService.authHeader();
        headers.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
        var body = "=" + address;
        var url = '/api/SalePoints/address/' + userId;
        return new Observable((obs: Observer<boolean>) => {
            return this.http.put(url, body, { headers: headers }).subscribe(data => {
                obs.next(true);
            })
        });
    }


    setLatLng(userId, latlng): Observable<boolean> {
        var headers = this.sessionService.authHeader();
        headers.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
        var body = "=" + JSON.stringify(latlng);;
        var url = '/api/SalePoints/latlng/' + userId;
        return new Observable((obs: Observer<boolean>) => {
            return this.http.put(url, body, { headers: headers }).subscribe(data => {
                obs.next(true);
            })
        });
    }

    setColor(userId, color): Observable<boolean> {
        var headers = this.sessionService.authHeader();
        headers.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
        var body = "=" + color;
        var url = '/api/SalePoints/color/' + userId;
        return new Observable((obs: Observer<boolean>) => {
            return this.http.put(url, body, { headers: headers }).subscribe(data => {
                obs.next(true);
            })
        });
    }
}