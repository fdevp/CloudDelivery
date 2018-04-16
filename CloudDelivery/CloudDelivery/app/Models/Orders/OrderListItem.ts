import { OrderStatus } from "../Enums/OrderStatus";

export interface OrderListItem {
    Id: number;

    SalepointName: string;
    SalepointId: number;

    CarrierName: string;
    CarrierId: number;

    AddedTime: Date;
    DeliveredTime: Date;
    RequiredPickUpTime: Date;

    DestinationCity: string;
    DestinationAddress: string;

    Status: OrderStatus;
}