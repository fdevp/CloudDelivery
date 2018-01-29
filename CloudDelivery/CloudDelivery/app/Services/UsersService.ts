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
    constructor(private http: Http, private sessionService: SessionService) {

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


    changePassword(userId, newPassword): Observable<boolean> {
        var headers = this.sessionService.authHeader();
        headers.append("Content-Type", "application/json")
        var body = { Id: userId, NewPassword: newPassword };
        var url = '/api/Account/SetPassword';
        return new Observable((obs: Observer<boolean>) => {
            return this.http.post(url, body, { headers: headers }).subscribe(data => {
                obs.next(true);
            }, err => {
                obs.next(false);
            })
        });
    }


    refreshList() {

    }

    list(): Observable<Array<UserListItem>> {
        var hdrz = this.sessionService.authHeader();
        return new Observable((obs: Observer<Array<UserListItem>>) => {
            return this.http.get('/api/users/list', { headers: hdrz }).subscribe(data => {
                var body = JSON.parse(data["_body"]);
                obs.next(body);
            }, e => { console.error("err", e); })
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
                obs.next(true);
            }, err => {
                obs.next(false);
            });
        });
    }

    roles(): Array<string> {
        return ["admin", "carrier", "salepoint", "organisator"];
    }

    setOrganisation(userId, organisationId): Observable<boolean> {
        var headers = this.sessionService.authHeader();
        headers.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
        var body = "=" + organisationId;
        var url = '/api/users/organisation/' + userId;
        return new Observable((obs: Observer<boolean>) => {
            return this.http.put(url, body, { headers: headers }).subscribe(data => {
                obs.next(true);
            })
        });
    }

    setRole(userId, role): Observable<boolean> {
        var headers = this.sessionService.authHeader();
        headers.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
        var body = "=" + role;
        var url = '/api/users/role/' + userId;
        return new Observable((obs: Observer<boolean>) => {
            return this.http.put(url, body, { headers: headers }).subscribe(data => {
                obs.next(true);
            })
        });
    }

    setPhone(userId, phone): Observable<boolean> {
        var headers = this.sessionService.authHeader();
        headers.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
        var body = "=" + phone;
        var url = '/api/users/phone/' + userId;
        return new Observable((obs: Observer<boolean>) => {
            return this.http.put(url, body, { headers: headers }).subscribe(data => {
                obs.next(true);
            })
        });
    }

    setName(userId, name): Observable<boolean> {
        var headers = this.sessionService.authHeader();
        headers.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
        var body = "=" + name;
        var url = '/api/users/name/' + userId;
        return new Observable((obs: Observer<boolean>) => {
            return this.http.put(url, body, { headers: headers }).subscribe(data => {
                obs.next(true);
            })
        });
    }

    setDescription(userId, description): Observable<boolean> {
        var headers = this.sessionService.authHeader();
        headers.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
        var body = "=" + description;
        var url = '/api/users/description/' + userId;
        return new Observable((obs: Observer<boolean>) => {
            return this.http.put(url, body, { headers: headers }).subscribe(data => {
                obs.next(true);
            })
        });
    }
}