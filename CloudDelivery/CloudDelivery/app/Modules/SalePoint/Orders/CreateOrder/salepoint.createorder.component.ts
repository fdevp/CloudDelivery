import { Component, OnInit, OnDestroy, ChangeDetectorRef, Inject, forwardRef } from '@angular/core';
import { Router } from '@angular/router';
import { OrderEditModel } from '../../../../Models/Orders/OrderEditModel';
import { GMapsService } from '../../../../Services/GMapsService';
import { GeoPosition } from '../../../../Models/GeoPosition';
import { ToastFactoryService } from '../../../../Services/UI/ToastFactoryService';
import { ModalFactoryService } from '../../../../Services/UI/ModalFactoryService';
import { SalepointOrdersService } from '../../../../Services/Orders/SalepointOrdersService';

@Component({
    selector: 'app-salepoint-createorder',
    templateUrl: './salepoint.createorder.component.html',
    styleUrls: ['./salepoint.createorder.component.css']

})

export class SalepointCreateOrderComponent {

    public model: OrderEditModel;
    public inProgress: boolean = false;
    public geocoderFinished: boolean = false;
    public geocoderSuccess: boolean = false;

    constructor(private ordersService: SalepointOrdersService, private gMapsService: GMapsService, private cdr: ChangeDetectorRef, private toastService: ToastFactoryService) {

        this.setCleanModel();
    }

    setCleanModel() {
        this.model = new OrderEditModel();
        this.model.DestinationCity = "Słupsk";
    }


    startGeocoder() {
        this.inProgress = true;
        this.geocoderFinished = false;
        var inProgressToast = this.toastService.progress("Wyszukiwanie lokalizacji");

        var query = this.model.DestinationCity + ", " + this.model.DestinationAddress;
        this.gMapsService.getPositionByQuery(query).subscribe((response: GeoPosition) => {
            this.model.EndLaLng = response;
            this.finishGeocoder(true, inProgressToast);
        }, err => {
            this.finishGeocoder(false, inProgressToast);
        })
    }

    finishGeocoder(result: boolean, toast: any) {
        this.geocoderSuccess = result;
        this.geocoderFinished = true;
        toast.toastRef.close();
        this.cdr.detectChanges();
    }

    addOrder() {
        var inProgressToast = this.toastService.progress("Dodawanie zamówienia");

        this.ordersService.add(this.model).subscribe(t => {
            inProgressToast.toastRef.close();
            this.toastService.toastr.success("Dodano zamówienie " + this.model.DestinationAddress, "Nowe zamówienie");
            this.setCleanModel();
            this.inProgress = false;
        }, err => {
            inProgressToast.toastRef.close();
            this.toastService.toastr.error("Wystąpił błąd: " + err, "Nowe zamówienie");
            this.inProgress = false;
        })
    }

    stopInProgress() {
        this.inProgress = false;
    }
}