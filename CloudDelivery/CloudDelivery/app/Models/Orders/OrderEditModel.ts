import { GeoPosition } from "../GeoPosition";

export class OrderEditModel {
    public DestinationCity: string;
    public DestinationAddress: string;
    public EndLaLng: GeoPosition;
    public CustomerPhone: string;
    public Price: number;
    public Message: string;
}