import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Router } from '@angular/router';
import { SessionUser } from '../Models/Session/SessionUser';
import { UserListItem } from '../Models/Users/UserListItem';
import { Headers, Http } from '@angular/http';
import { SignalrService } from './SignalrService';
import { Roles } from "../Models/Enums/Roles";

import 'rxjs/add/observable/of';
import 'rxjs/Rx';

@Injectable()
export class SessionService {
    isLoggedIn = false;
    redirectUrl: string = null;
    token: string;
    user: SessionUser = new SessionUser();

    constructor(private router: Router, private http: Http, private signalrService: SignalrService) {

    }

    checkLogin(): Observable<boolean> {
        //logged before
        if (this.isLoggedIn)
            return Observable.of(true);

        //try login by token
        this.token = sessionStorage.getItem("cdskey");

        if (this.token == null)
            return Observable.of(false);


        return new Observable((obs: Observer<boolean>) => {
            return this.http.get('/api/account/UserInfo', { headers: this.authHeader() }).subscribe(data => {
                var body = JSON.parse(data["_body"]);
                this.user.name = body.Name;
                this.user.login = body.Login;
                this.user.roles = JSON.parse(body.Roles);

                this.isLoggedIn = true;
                this.startWebsockets();
                    
                if (this.redirectUrl != null) {
                    this.router.navigate([this.redirectUrl]);
                    this.redirectUrl = null;
                }

                obs.next(true);
            }, error => {
                this.removeToken();
                obs.next(false);
            });
        });
    }

    authHeader(): Headers {
        var httpHeaders = new Headers();
        httpHeaders.append("Authorization", "Bearer " + this.token);
        return httpHeaders;
    }

    login(email: string, password: string): Observable<boolean> {
        return new Observable((obs: Observer<boolean>) => {

            var loginBody = "grant_type=password&username=" + email + "&password=" + password;

            var loginHeaders = new Headers();
            loginHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            this.http.post('/token', loginBody, { headers: loginHeaders }).map(data => data.json()).subscribe(data => {

                //set data
                this.token = data["access_token"];
                this.user.name = data["Name"]; 
                this.user.login = data["Login"];
                this.user.roles = JSON.parse(data["Roles"]);

                this.saveToken();

                this.isLoggedIn = true;
                this.startWebsockets();
                

                if (this.redirectUrl != null) {
                    this.router.navigate([this.redirectUrl]);
                    this.redirectUrl = null;
                }

                obs.next(true);
            }, error => obs.error(error));
        });
    }

    startWebsockets() {
        this.signalrService.setAuthHeader(this.token);
        var role: Roles;
        if (this.hasRole(Roles.SalePoint))
            role = Roles.SalePoint;
        else if (this.hasRole(Roles.Carrier))
            role = Roles.Carrier;
        else if (this.isAdmin())
            role = Roles.Admin;

        this.signalrService.setCallbacks(role);
        this.signalrService.startConnection();
    }

    isAdmin(): boolean {
        if (this.user.roles == null)
            return false;
        return this.user.roles.indexOf(Roles.Admin) > -1;
    }

    hasRole(role): boolean {
        if (this.user.roles == null)
            return false;
        return this.user.roles.indexOf(role) > -1;
    }

    logout(): void {
        this.removeToken();
        this.isLoggedIn = false;
        this.user = new SessionUser();
        this.router.navigate(["./login"]);
    }

    private removeToken(): void {
        this.token = null;
        sessionStorage.removeItem("cdskey");
    }

    private saveToken(): void {
        sessionStorage.setItem("cdskey", this.token);
    }
}