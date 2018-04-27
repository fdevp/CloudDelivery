import { Component, OnInit, OnDestroy, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { OrdersService } from '../../../Services/Orders/OrdersService';
import { Router } from '@angular/router';
import { OrderListItem } from '../../../Models/Orders/OrderListItem'
import { OrdersListFilters } from '../../../Models/Orders/OrdersListFilters';
import { OrderStatusPipe } from '../../Shared/pipes/OrderStatusPipe'
import { ShortDateTimePipe } from '../../Shared/pipes/ShortDateTimePipe'
import { ModalFactoryService } from '../../../Services/UI/ModalFactoryService';
import { BsModalRef } from 'ngx-bootstrap';
import { RoutesService } from '../../../Services/RoutesService';
import { RouteListItem } from '../../../Models/Routes/RouteListItem';
import { DurationTextPipe } from '../../Shared/Pipes/DurationTextPipe';
import { RouteStatusPipe } from '../../Shared/Pipes/RouteStatusPipe';

@Component({
    selector: 'app-admin-routes',
    templateUrl: './admin.routes.component.html'
})

export class AdminRoutesComponent {
    public selected = [];
    public routes: Array<RouteListItem> = [];
    public initialized: boolean = false;

    columns = [
        { prop: 'Id' },
        { prop: 'CarrierName', name: 'Kierowca' },
        { prop: 'AddedTime', name: 'Utworzona', pipe: new ShortDateTimePipe("pl-PL") },
        { prop: 'RoutePointsCount', name: 'Ilość punktów' },
        { prop: 'Status', name: 'Status', pipe: new RouteStatusPipe() },
        { prop: 'FinishTime', name: 'Zakończona', pipe: new ShortDateTimePipe("pl-PL") },
        { prop: 'Duration', name: 'Czas trwania', pipe: new DurationTextPipe() },

    ];

    constructor(private routesService: RoutesService, private router: Router, private modalService: ModalFactoryService, private cdr: ChangeDetectorRef) {
        this.initializeOrdersList();
    }

    public initializeOrdersList(): void {
        this.routesService.list(false).subscribe(routesList => {
            this.routes = routesList;
            this.initialized = true;
        }); 
    }

    public routeSelect({ selected }) {
        var obj = this;
        this.router.navigate(["admin/route", selected[0].Id]);
    }
}