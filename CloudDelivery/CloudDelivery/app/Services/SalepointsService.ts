import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { SessionService } from '../Services/SessionService'
import 'rxjs/add/observable/of';
import 'rxjs/Rx';
import { Salepoint } from '../Models/Salepoints/Salepoint';

@Injectable()
export class SalepointsService {
    constructor(private http: Http, private sessionService: SessionService) {

    }

    list(): Observable<Array<Salepoint>> {
        var hdrz = this.sessionService.authHeader();
        return new Observable((obs: Observer<Array<Salepoint>>) => {
            return this.http.get('/api/Salepoints/list', { headers: hdrz }).subscribe(data => {
                var body = JSON.parse(data["_body"]);
                obs.next(body);
            }, e => { console.error("err", e); })
        });
    }

    listOrg(orgId): Observable<Salepoint> {
        var headers = this.sessionService.authHeader();
        var url = '/api/Salepoints/details/' + orgId;
        return new Observable((obs: Observer<Salepoint>) => {
            return this.http.get(url, { headers: headers }).subscribe(data => {
                var body = JSON.parse(data["_body"]);
                obs.next(body);
            })
        });
    }

    details(userId): Observable<Salepoint> {
        var headers = this.sessionService.authHeader();
        var url = '/api/Salepoints/details/' + userId;
        return new Observable((obs: Observer<Salepoint>) => {
            return this.http.get(url, { headers: headers }).subscribe(data => {
                var sp: Salepoint = JSON.parse(data["_body"]);
                obs.next(sp);
            })
        });
    }

    setCity(userId, city): Observable<boolean> {
        var headers = this.sessionService.authHeader();
        headers.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
        var body = "=" + city;
        var url = '/api/Salepoints/city/' + userId;
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
        var url = '/api/Salepoints/address/' + userId;
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
        var url = '/api/Salepoints/latlng/' + userId;
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
        var url = '/api/Salepoints/color/' + userId;
        return new Observable((obs: Observer<boolean>) => {
            return this.http.put(url, body, { headers: headers }).subscribe(data => {
                obs.next(true);
            })
        });
    }
}