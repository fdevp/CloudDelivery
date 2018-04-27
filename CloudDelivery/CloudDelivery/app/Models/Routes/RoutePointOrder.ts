import { OrderCarrier } from "../Orders/OrderCarrier";

export interface RoutePointOrder extends OrderCarrier {
    AcceptedTime: Date;
    PickUpTime: Date;
    DeliveredTime: Date;

    SalepointPhone: string;
}