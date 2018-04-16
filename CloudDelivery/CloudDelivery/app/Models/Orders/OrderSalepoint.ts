import { GeoPosition } from "../GeoPosition";
import { OrderStatus } from "../Enums/OrderStatus";


export class OrderSalepoint {
    Id: number;

    CarrierPhone: string;
    CarrierName: string;
    CarrierId: number;

    AddedTime: Date;
    AcceptedTime: Date;
    PickUpTime: Date;
    RequiredPickUpTime: Date;

    DestinationCity: string;
    DestinationAddress: string;
    Price: number;
    CustomerPhone: string;

    Status: OrderStatus;
    EndLatLng: GeoPosition;
}