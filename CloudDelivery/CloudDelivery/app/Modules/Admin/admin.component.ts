import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
import { MenuItem } from '../../models/MenuItem';
import { MenuService } from "../../Services/MenuService"
//import { ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';


@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit, OnDestroy {
    public mylinks: Array<MenuItem> = [];
    //public toastrConfig: ToasterConfig;

    public skin = 'skin-black';

    constructor(
        //private sessionService: SessionService,
        //private toastr: ToasterService,
        private route: ActivatedRoute,
        private menuService: MenuService
    ) {
        //this.toastrConfig = new ToasterConfig({
        //    newestOnTop: true,
        //    showCloseButton: true,
        //    tapToDismiss: false
        //});


        this.mylinks = this.menuService.getMenu();
        console.log(this.mylinks);
    }

    public ngOnInit() {
        document.body.className = 'hold-transition ' + this.skin + ' layout-top-nav';
    }

    public ngOnDestroy() {
        document.body.className = '';
    }

}