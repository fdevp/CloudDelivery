import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {SessionService} from '../Services/SessionService';
import { Roles } from '../Models/Enums/Roles';



@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit, OnDestroy {
    public skin = 'skin-yellow-light';

    constructor(
        private sessionService: SessionService,
        private route: ActivatedRoute,
        private router: Router
    ) {

    }

    public ngOnInit() {
        document.body.className = 'hold-transition ' + this.skin + ' layout-boxed';

        var page = null;

        if (this.sessionService.isAdmin())
            page = 'admin';
        else if (this.sessionService.hasRole(Roles.Carrier))
            page = 'carrier';
        else if (this.sessionService.hasRole(Roles.SalePoint))
            page = 'salepoint';


        this.router.navigate([page]);
    }

    public ngOnDestroy() {
        document.body.className = '';
    }

    public Logout(): void {
        this.sessionService.logout();
    }
}