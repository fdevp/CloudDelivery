import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { CanLoad, Route, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SessionService } from '../SessionService';

import 'rxjs/add/observable/of';

@Injectable()
export class UserViewGuard implements CanLoad, CanActivate, CanActivateChild {
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
            let url = state.url;
            return this.authorize(url);
        }
    
    
        private authorize(url): Observable<boolean>{
            console.error("user auth");
            return this.sessionService.checkLogin().map(valid => {
                if (!valid) {
                    this.sessionService.redirectUrl = url;
                    this.router.navigate(['/login']);
                    return false;
                }
                
                return true;

            }, error => {
                this.sessionService.redirectUrl = url;
                this.router.navigate(['/login']);
                return Observable.of(false);
            });
        }
}