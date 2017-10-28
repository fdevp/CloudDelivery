import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SessionService } from '../SessionService';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private sessionService: SessionService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        let url: string = state.url;

        return this.sessionService.checkLogin().map(valid => {
            if (!valid)
                this.redirectToLogin(url);
            return valid;
        }, error => {
            this.redirectToLogin(url);
            return error;
        });
    }

    redirectToLogin(url) {
        this.sessionService.redirectUrl = url;

        // Navigate to the login page with extras
        this.router.navigate(['/login']);
    }
}