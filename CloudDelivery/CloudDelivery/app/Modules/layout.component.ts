import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {SessionService} from '../Services/SessionService';



@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit, OnDestroy {
    public skin = 'skin-black';

    constructor(
        private sessionService: SessionService,
        private route: ActivatedRoute,
        private router: Router
    ) {

    }

    public ngOnInit() {
        document.body.className = 'hold-transition ' + this.skin + ' layout-top-nav';

        var page = null;

        if (this.sessionService.isAdmin())
            page = 'admin';
        else if (this.sessionService.hasRole("carrier"))
            page = 'carrier';

        this.router.navigate([page]);
    }

    public ngOnDestroy() {
        document.body.className = '';
    }
}