import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { SessionService } from '../../Services/SessionService'
import 'rxjs/add/observable/of';
import 'rxjs/Rx';
import { Carrier } from '../../Models/Carriers/Carrier';

@Injectable()
export class CarriersService {
    constructor(private http: Http, private sessionService: SessionService) {
        
    }

    list(): Observable<Array<Carrier>> {
        var headers = this.sessionService.authHeader();
        return new Observable((obs: Observer<Array<Carrier>>) => {
            return this.http.get('/api/carriers/list', { headers: headers }).subscribe(data => {
                var body = JSON.parse(data["_body"]);
                obs.next(body);
            }, e => { console.error("err", e); })
        });
    }

    details(userId): Observable<Carrier> {
        var headers = this.sessionService.authHeader();
        var url = '/api/carriers/details/' + userId;
        return new Observable((obs: Observer<Carrier>) => {
            return this.http.get(url, { headers: headers }).subscribe(data => {
                var body = JSON.parse(data["_body"]);
                obs.next(body);
            })
        });
    }

    setColor(userId, color): Observable<boolean> {
        var headers = this.sessionService.authHeader();
        headers.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
        var body = "=" + color;
        var url = '/api/carriers/color/' + userId;
        return new Observable((obs: Observer<boolean>) => {
            return this.http.put(url, body, { headers: headers }).subscribe(data => {
                obs.next(true);
            })
        });
    }
}