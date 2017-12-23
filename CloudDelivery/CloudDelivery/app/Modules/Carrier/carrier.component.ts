import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from '../../models/MenuItem';
//import { ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';


@Component({
    selector: 'app-carrier',
    templateUrl: './carrier.component.html'
})
export class CarrierComponent implements OnInit, OnDestroy {
    public skin = 'skin-black';

    constructor(
        //private sessionService: SessionService,
        //private toastr: ToasterService,
        private route: ActivatedRoute
    ) {
        const param = route.snapshot.data[0];

        //this.toastrConfig = new ToasterConfig({
        //    newestOnTop: true,
        //    showCloseButton: true,
        //    tapToDismiss: false
        //});
    }

    public ngOnInit() {
        document.body.className = 'hold-transition ' + this.skin + ' layout-top-nav';
    }

    public ngOnDestroy() {
        document.body.className = '';
    }

}