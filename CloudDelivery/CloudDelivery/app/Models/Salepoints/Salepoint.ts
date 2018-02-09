import { GeoPosition } from "../GeoPosition";

export class SalePoint {
    constructor() {
        this.LatLng = new GeoPosition();
    }
    UserId: number;
    City: string;
    Address: string;
    LatLng: GeoPosition;
    Marker: string;
}