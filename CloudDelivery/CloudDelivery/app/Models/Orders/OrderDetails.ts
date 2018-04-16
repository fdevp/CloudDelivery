import { GeoPosition } from "../GeoPosition";
import { OrderStatus } from "../Enums/OrderStatus";

export class OrderDetails {
    Id: number;

    SalepointName: string;
    SalepointId: number;
    SalepointAddress: string;
    SalepointCity: string;
    SalepointLatLng: GeoPosition;

    CarrierName: string;
    CarrierPhone: string;
    CarrierId: number;

    AddedTime: Date;
    AcceptedTime: Date;
    CancellationTime: Date;
    PickUpTime: Date;
    DeliveredTime: Date;
    RequiredPickUpTime: Date;

    DestinationCity: string;
    DestinationAddress: string;
    EndLatLng: GeoPosition;
    Price: number;
    CustomerPhone: string;
    Duration: number;
    
    Status: OrderStatus;
}