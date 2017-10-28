import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CanLoad, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { SessionService } from '../SessionService';

@Injectable()
export class CarrierGuard implements CanLoad, CanActivate, CanActivateChild {

    constructor(private sessionService: SessionService, private router: Router) { }

    canLoad(route: Route): Observable<boolean> {
        let url = route.path
        return this.authorize(url);
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        let url = state.url
        return this.authorize(url);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        let url = state.url
        return this.authorize(url);
    }

    private authorize(url): Observable<boolean> {
        console.error("carrier auth");
        return this.sessionService.checkLogin().map(valid => {
            if (!valid) {
                this.sessionService.redirectUrl = url;
                this.router.navigate(['/login']);
                return false;
            }
            return this.sessionService.hasRole("carrier");
        }, error => {
            this.sessionService.redirectUrl = url;
            this.router.navigate(['/login']);
            return Observable.of(false);
        });
    }
}