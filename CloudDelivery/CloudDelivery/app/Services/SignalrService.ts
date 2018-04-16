import { Injectable, EventEmitter } from "@angular/core";
import { ToastFactoryService } from "./UI/ToastFactoryService";
import { SignalrConnectionStates } from "../Models/Enums/SignalrConnectionState";
import { Roles } from "../Models/Enums/Roles";
import { SalepointOrdersService } from "./Orders/SalepointOrdersService";
import { CarrierOrdersService } from "./Orders/CarrierOrdersService";
import { OrderCarrier } from "../Models/Orders/OrderCarrier";
import { OrderSalepoint } from "../Models/Orders/OrderSalepoint";

declare const $: any;

@Injectable()
export class SignalrService {
    public signalrStateChange: EventEmitter<any> = new EventEmitter();
    public connectionState: SignalrConnectionStates;

    public salepointOrderAccepted: EventEmitter<OrderSalepoint> = new EventEmitter();
    public salepointOrderDelivered: EventEmitter<any> = new EventEmitter();
    public salepointOrderPickedUp: EventEmitter<any> = new EventEmitter();

    public carrierOrderAccepted: EventEmitter<number> = new EventEmitter();
    public carrierOrderAdded: EventEmitter<OrderCarrier> = new EventEmitter();
    public carrierOrderCancelled: EventEmitter<number> = new EventEmitter();

    private proxy: any;
    private connection: any;

    constructor(private toastsService: ToastFactoryService) {
        this.connection = $.hubConnection();
        var obj = this;
        this.connection.stateChanged(function (state) {
            obj.connectionState = state.newState;
            obj.signalrStateChange.emit(obj.connectionState);
        });

        this.proxy = this.connection.createHubProxy("NotificationsHub")
    }

    setAuthHeader(token) {
        $.signalR.ajaxDefaults.headers = token;
    }

    setCallbacks(role: Roles) {
        switch (role) {
            case Roles.SalePoint:
                this.setSalepointCallbacks();
                break;
            case Roles.Admin:
            case Roles.Carrier:
                this.setCarrierCallbacks(); //notifications are same for admin and carrier
                break;
        }
    }

    cleanConnection() {
        this.proxy.on("OrderAccepted", function (obj) {

        });

        this.proxy.on("OrderDelivered", function (obj) {

        });

        this.proxy.on("OrderPickedUp", function (obj) {

        });

        this.proxy.on("OrderCancelled", function (obj) {

        });

        this.proxy.on("OrderAdded", function (obj) {

        });
    }

    cleanAuthHeader() {
        $.signalR.ajaxDefaults.headers = null;
    }

    startConnection() {
        var obj = this;
        this.connection.start().done(function () {
            obj.toastsService.toastr.success(null, "Nawiązano połączenie z serwerem.");
            console.warn("signalr success");
        }).fail(function () {
            obj.toastsService.toastr.error(null, "Nawiązanie połączenia z serwerem nie powiodło się.");
            console.warn("signalr err");
        });
    }

    endConnection() {
        this.connection.stop();
    }

    private setSalepointCallbacks() {
        var obj = this;
        this.proxy.on("OrderAccepted", function (order) {
            obj.salepointOrderAccepted.emit(order);
        });

        this.proxy.on("OrderDelivered", function (orderId) {
            obj.salepointOrderDelivered.emit(orderId);
        });

        this.proxy.on("OrderPickedUp", function (orderId) {
            obj.salepointOrderPickedUp.emit(orderId);
        });
    }

    private setCarrierCallbacks() {
        var obj = this;
        this.proxy.on("OrderAccepted", function (orderId) {
            obj.carrierOrderAccepted.emit(orderId);
        });

        this.proxy.on("OrderCancelled", function (orderId) {
            obj.carrierOrderCancelled.emit(orderId);
        });

        this.proxy.on("OrderAdded", function (order) {
            obj.carrierOrderAdded.emit(order);
        });
    }

}