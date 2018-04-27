import { Component, Inject, forwardRef, EventEmitter } from "@angular/core";
import { OrderDetails } from "../../../../Models/Orders/OrderDetails";
import { OrdersService } from "../../../../Services/Orders/OrdersService";
import { BsModalRef } from 'ngx-bootstrap'
import { ModalFactoryService } from "../../../../Services/UI/ModalFactoryService";
import { SessionService } from "../../../../Services/SessionService";
import { GeoPosition } from "../../../../Models/GeoPosition";
import { GMapsService } from "../../../../Services/GMapsService";
import { Roles } from "../../../../Models/Enums/Roles";

@Component({
    selector: 'order-details-modal',
    templateUrl: './order.details.modal.html',
    styleUrls: ['./order.details.modal.css']
})
export class OrderDetailsModal {
    details: OrderDetails = new OrderDetails();
    orderId: number;
    baseLocation: GeoPosition;

    detailsProgress: boolean = true;

    modalClosed: EventEmitter<any> = new EventEmitter();

    constructor(private bsModalRef: BsModalRef, private ordersService: OrdersService, private sessionService: SessionService, private gMapsService: GMapsService) {
        this.baseLocation = gMapsService.getBaseLocation();
    }

    isAdmin() {
        return this.sessionService.isAdmin();
    }

    isCarrier() {
        return this.sessionService.hasRole(Roles.Carrier);
    }

    isSalepoint() {
        return this.sessionService.hasRole(Roles.SalePoint);
    }

    initOrderDetails(orderId) {
        this.orderId = orderId;

        this.ordersService.details(this.orderId).subscribe((orderDetails: OrderDetails) => {
            this.details = orderDetails;
            this.detailsProgress = false;

            if (this.details.EndLatLng != null)
                this.baseLocation = this.details.EndLatLng;
        });

    }

    closeModal() {
        this.modalClosed.emit();
        this.bsModalRef.hide();
    }
}