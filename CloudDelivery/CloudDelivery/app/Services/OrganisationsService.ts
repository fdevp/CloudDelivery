import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { OrganisationListItem } from '../Models/OrganisationListItem'
import { Organisation } from '../Models/Organisation'
import { SessionService } from '../Services/SessionService'
import 'rxjs/add/observable/of';
import 'rxjs/Rx';


@Injectable()
export class OrganisationsService {

    constructor(private http: Http, private sessionServ: SessionService) {
        this.sessionService = sessionServ;
    }


    public list(): Observable<Array<OrganisationListItem>> {
        var headers = this.sessionService.authHeader();
        return new Observable((obs: Observer<Array<OrganisationListItem>>) => {
            return this.http.get('/api/organisations/list', { headers: headers }).subscribe(data => {
                var body = JSON.parse(data["_body"]);
                obs.next(body);
            }, e => { console.error("err", e); })
        });
    }

    public members(organisationId): Observable<boolean> {
        var headers = this.sessionService.authHeader();
        var url = '/api/organisations/members' + organisationId;
        return new Observable((obs: Observer<boolean>) => {
            return this.http.get(url, { headers: headers }).subscribe(data => {
                var body = JSON.parse(data["_body"]);
                console.error("get", body);
            })
        });
    }


    public add(name): Observable<boolean> {
        var headers = this.sessionService.authHeader();
        var body = { "name": name };
        return new Observable((obs: Observer<boolean>) => {
            return this.http.post('/api/organisations/members', body, { headers: headers }).subscribe(data => {
                var body = JSON.parse(data["_body"]);
                console.error("get", body);
            })
        });
    }

    public remove(organisationId): Observable<boolean> {
        var headers = this.sessionService.authHeader();
        var url = '/api/users/remove/' + organisationId;
        return new Observable((obs: Observer<boolean>) => {
            return this.http.delete(url, { headers: headers }).subscribe(data => {
                var body = JSON.parse(data["_body"]);
                console.error("get", body);
            })
        });
    }

    private sessionService: SessionService;
}