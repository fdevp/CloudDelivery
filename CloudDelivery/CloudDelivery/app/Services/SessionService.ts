import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Router } from '@angular/router';
import { SessionUser } from '../Models/Session/SessionUser';
import { Headers, Http } from '@angular/http';
import { SignalrService } from './SignalrService';
import { Roles } from "../Models/Enums/Roles";

import 'rxjs/add/observable/of';
import 'rxjs/Rx';
import { RefreshTokenInfo } from '../Models/RefreshTokenInfo';

@Injectable()
export class SessionService {
    isLoggedIn = false;
    redirectUrl: string = null;
    token: string;
    tokenInitializing = false;
    user: SessionUser = new SessionUser();

    constructor(private router: Router, private http: Http, private signalrService: SignalrService) {

    }

    checkRefreshToken(): Observable<boolean> {
        this.tokenInitializing = true;

        //logged before
        if (this.isLoggedIn)
            return Observable.of(true);

        //try login by token
        const refreshToken = localStorage.getItem("cdskey");

        if (refreshToken == null) {
            return Observable.of(false);
        }

        var loginBody = "grant_type=refresh_token&refresh_token=" + refreshToken;
        return this.login(loginBody);
    }

    authHeader(): Headers {
        var httpHeaders = new Headers();
        httpHeaders.append("Authorization", "Bearer " + this.token);
        return httpHeaders;
    }

    login(loginBody: string): Observable<boolean> {
        return new Observable((obs: Observer<boolean>) => {
            var loginHeaders = new Headers();
            loginHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            this.http.post('/token', loginBody, { headers: loginHeaders }).map(data => data.json()).subscribe(data => {

                //set data
                this.token = data["access_token"];
                this.user.name = data["Name"];
                this.user.login = data["Login"];
                this.user.roles = JSON.parse(data["Roles"]);

                const refreshToken = data["refresh_token"];
                if (refreshToken) {
                    this.saveToken(refreshToken);
                }

                this.isLoggedIn = true;
                this.tokenInitializing = false;
                this.startWebsockets();


                if (this.redirectUrl != null) {
                    this.router.navigate([this.redirectUrl]);
                    this.redirectUrl = null;
                }

                obs.next(true);
            }, error => obs.next(false));
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
        const refreshToken = localStorage.getItem("cdskey");
        this.cancelCurrentToken(refreshToken).subscribe(() => {
            this.removeToken();
            this.isLoggedIn = false;
            this.user = new SessionUser();
            this.router.navigate(["./login"]);
        });

    }

    refreshTokens(): Observable<RefreshTokenInfo[]> {
        var path = '/api/Account/tokens';
        return new Observable((obs: Observer<RefreshTokenInfo[]>) => {
            return this.http.get(path, { headers: this.authHeader() }).subscribe(data => {
                var body = JSON.parse(data["_body"]);
                obs.next(body);
            }, e => { console.error("err", e); })
        });

        /*var path = '/api/Account/tokens';

        return new Observable((obs: Observer<RefreshTokenInfo[]>) => {
            return this.http.get(path).subscribe(data => {
                var body = JSON.parse(data["_body"]);
                obs.next(body);
            }, e => { console.error("err", e); })
        });*/
    }

    cancelToken(token: number): Observable<boolean> {
        var path = '/api/Account/cancelToken/' + token;
        return new Observable((obs: Observer<boolean>) => {
            return this.http.put(path, {}, { headers: this.authHeader() }).subscribe(data => {
                obs.next(true);
            }, e => { console.error("err", e); })
        });
    }

    cancelCurrentToken(token: string): Observable<boolean> {
        var path = '/api/Account/cancelToken/';
        var body = { token };
        return new Observable((obs: Observer<boolean>) => {
            return this.http.put(path, body, { headers: this.authHeader() }).subscribe(data => {
                obs.next(true);
            }, e => { console.error("err", e); })
        });
    }

    getBrowserInfo(): string {
        var ua = navigator.userAgent, tem,
            M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return 'IE ' + (tem[1] || '');
        }
        if (M[1] === 'Chrome') {
            tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
            if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
        return M.join(' ');
    }

    private removeToken(): void {
        this.token = null;
        localStorage.removeItem("cdskey");
    }

    private saveToken(token: string): void {
        localStorage.setItem("cdskey", token);
    }
}