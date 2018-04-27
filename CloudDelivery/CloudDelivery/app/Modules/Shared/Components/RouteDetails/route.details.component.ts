import { Component, OnInit, OnDestroy, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { RouteDetails } from '../../../../Models/Routes/RouteDetails';
import { RoutesService } from '../../../../Services/RoutesService';
import { Router, ActivatedRoute } from '@angular/router';
import { RoutePointType } from '../../../../Models/Enums/RoutePointType';
import { SessionService } from '../../../../Services/SessionService';
import { GMapsService } from '../../../../Services/GMapsService';
import { GeoPosition } from '../../../../Models/GeoPosition';
import { RouteStatus } from '../../../../Models/Enums/RouteStatus';
import { ModalFactoryService } from '../../../../Services/UI/ModalFactoryService';

@Component({
    selector: 'app-route-details',
    templateUrl: './route.details.component.html',
    styleUrls: ['./route.details.component.css']
})

export class RouteDetailsComponent implements OnInit {

    public routeId: number;
    public details: RouteDetails;

    public routePointTypeEnum = RoutePointType;
    public routeStatusEnum = RouteStatus;

    public initialized: boolean = false;

    public baseLocation: GeoPosition;

    constructor(private sessionService: SessionService, private route: ActivatedRoute, private routesService: RoutesService, private router: Router, private cdr: ChangeDetectorRef, private gMapsService: GMapsService, private modalService: ModalFactoryService) {
        this.baseLocation = gMapsService.getBaseLocation();
    }



    isAdmin() {
        return this.sessionService.isAdmin();
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.routeId = +params['id'];

            this.routesService.details(this.routeId).subscribe(details => {
                this.details = details;
                this.initialized = true;
            })

        });
    }

    orderDetails(orderId: number) {
        var modal = this.modalService.showModal("OrderDetailsModal");
        modal.content.initOrderDetails(orderId);
    }

}