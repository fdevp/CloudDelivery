import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { OrganisationListItem } from '../../Models/OrganisationListItem'
import { Organisation } from '../../Models/Organisation'
import { SessionService } from '../../Services/SessionService'
import 'rxjs/add/observable/of';
import 'rxjs/Rx';
import { UserListItem } from '../../Models/Users/UserListItem';


@Injectable()
export class OrganisationsService {


    lista = new Array<OrganisationListItem>();

    constructor(private http: Http, private sessionService: SessionService) {
    }


    refreshList() {

    }

    public list(): Observable<Array<OrganisationListItem>> {
        var headers = this.sessionService.authHeader();
        return new Observable((obs: Observer<Array<OrganisationListItem>>) => {
            return this.http.get('/api/organisations/list', { headers: headers }).subscribe(data => {
                var body = JSON.parse(data["_body"]);
                this.lista = body;
                obs.next(this.lista);
            }, e => { console.error("err", e); })
        });
    }

    public members(organisationId): Observable<Array<UserListItem>> {
        var headers = this.sessionService.authHeader();
        var url = '/api/organisations/members/' + organisationId;
        return new Observable((obs: Observer<Array<UserListItem>>) => {
            return this.http.get(url, { headers: headers }).subscribe(data => {
                var body = JSON.parse(data["_body"]);
                obs.next(body);
            })
        });
    }

    setName(userId, name): Observable<boolean> {
        var headers = this.sessionService.authHeader();
        headers.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
        var body = "=" + name;
        var url = '/api/organisations/name/' + userId;
        return new Observable((obs: Observer<boolean>) => {
            return this.http.put(url, body, { headers: headers }).subscribe(data => {
                obs.next(true);
            })
        });
    }

    public add(name): Observable<boolean> {
        var headers = this.sessionService.authHeader();
        headers.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
        var body = "=" + name;
        return new Observable((obs: Observer<boolean>) => {
            return this.http.post('/api/Organisations/Add', body, { headers: headers }).subscribe(data => {
                obs.next(true);
            }, err => { obs.next(false) })
        });
    }

    public remove(organisationId): Observable<boolean> {
        var headers = this.sessionService.authHeader();
        var url = '/api/users/remove/' + organisationId;
        return new Observable((obs: Observer<boolean>) => {
            return this.http.delete(url, { headers: headers }).subscribe(data => {
                var body = JSON.parse(data["_body"]);
            })
        });
    }
}