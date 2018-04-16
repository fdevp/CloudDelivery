import { GeoPosition } from "../GeoPosition";
import { OrderStatus } from "../Enums/OrderStatus";


export class OrderCarrier {
    Id: number;

    SalepointName: string;
    SalepointCity: string;
    SalepointAddress: string;
    SalepointId: number;
    SalepointLatLng: GeoPosition;

    AddedTime: Date;
    RequiredPickUpTime: Date;

    DestinationCity: string;
    DestinationAddress: string;
    Price: number;
    CustomerPhone: string;

    Status: OrderStatus;
    EndLatLng: GeoPosition;
}