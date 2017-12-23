import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { UserListItem } from '../Models/Users/UserListItem'
import { UserEditModel } from '../Models/Users/UserEditModel'
import { SessionService } from '../Services/SessionService'
import 'rxjs/add/observable/of';
import 'rxjs/Rx';

@Injectable()
export class UsersService {
    private usersList: Array<UserListItem> = [];
    private listInitialized: boolean = false;

    constructor(private http: Http, private sessionServ: SessionService) {
        this.sessionService = sessionServ;
    }

    create(model: UserEditModel): Observable<number> {
        var hdrz = this.sessionService.authHeader();
        return new Observable((obs: Observer<number>) => {
            return this.http.post('/api/account/register', model, { headers: hdrz }).subscribe((data) => {
                console.log(data);
                var body = JSON.parse(data["_body"]);
                var id = parseInt(body);
                obs.next(id);
            }, err => { obs.error(err) });
        });
    }

    public list(refresh): Observable<Array<UserListItem>> {
        if (!refresh && this.listInitialized) {
            return Observable.of(this.usersList);
        }

        var hdrz = this.sessionService.authHeader();
        return new Observable((obs: Observer<Array<UserListItem>>) => {
            return this.http.get('/api/users/list', { headers: hdrz }).subscribe(data => {
                var body = JSON.parse(data["_body"]);
                this.usersList = body;
                this.listInitialized = true;
                obs.next(this.usersList);
            }, e => { console.error("err", e); obs.next(this.usersList); })
        });
    }

    details(userId): Observable<UserListItem> {
        var headers = this.sessionService.authHeader();
        var url = '/api/users/details/' + userId;
        return new Observable((obs: Observer<UserListItem>) => {
            return this.http.get(url, { headers: headers }).subscribe(data => {
                var body = JSON.parse(data["_body"]);
                obs.next(body);
            })
        });
    }

    remove(userId): Observable<boolean> {
        var headers = this.sessionService.authHeader();
        var url = '/api/Users/Remove/' + userId;
        return new Observable((obs: Observer<boolean>) => {
            return this.http.delete(url, { headers: headers }).subscribe(data => {
                var body = JSON.parse(data["_body"]);
                obs.next(true);
            }, err => {
                obs.next(false);
            });
        });
    }

    roles(): Array<string> {
        return ["admin", "carrier", "salepoint", "organisator"];
    }

    edit(userId, phone, description): Observable<boolean> {
        var headers = this.sessionService.authHeader();
        var body = { "phone": phone, "description": description };
        var url = '/api/users/edit/' + userId;
        return new Observable((obs: Observer<boolean>) => {
            return this.http.put('/api/users/edit', body, { headers: headers }).subscribe(data => {
                var body = JSON.parse(data["_body"]);
                console.error("get", body);
            })
        });
    }

    setOrganisation(userId, organisationId): Observable<boolean> {
        var headers = this.sessionService.authHeader();
        var body = { "organisationId": organisationId };
        return new Observable((obs: Observer<boolean>) => {
            return this.http.put('/api/users/organisation', body, { headers: headers }).subscribe(data => {
                console.error("org data status", data.status);
            })
        });
    }

    setRole(userId, role): Observable<boolean> {
        var headers = this.sessionService.authHeader();
        var body = { "organisationId": role };
        return new Observable((obs: Observer<boolean>) => {
            return this.http.put('/api/users/organisation', body, { headers: headers }).subscribe(data => {
                console.error("org data status", data.status);
            })
        });
    }

    setPhone(userId, organisationId): Observable<boolean> {
        var headers = this.sessionService.authHeader();
        var body = { "organisationId": organisationId };
        return new Observable((obs: Observer<boolean>) => {
            return this.http.put('/api/users/organisation', body, { headers: headers }).subscribe(data => {
                console.error("org data status", data.status);
            })
        });
    }

    setName(userId, organisationId): Observable<boolean> {
        var headers = this.sessionService.authHeader();
        var body = { "organisationId": organisationId };
        return new Observable((obs: Observer<boolean>) => {
            return this.http.put('/api/users/organisation', body, { headers: headers }).subscribe(data => {
                console.error("org data status", data.status);
            })
        });
    }

    setDescription(userId, organisationId): Observable<boolean> {
        var headers = this.sessionService.authHeader();
        var body = { "organisationId": organisationId };
        return new Observable((obs: Observer<boolean>) => {
            return this.http.put('/api/users/organisation', body, { headers: headers }).subscribe(data => {
                console.error("org data status", data.status);
            })
        });
    }


    private sessionService: SessionService;

}