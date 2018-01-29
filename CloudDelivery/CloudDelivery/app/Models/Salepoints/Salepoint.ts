import { GeoPosition } from "../GeoPosition";

export class Salepoint {
    constructor() {
        this.LatLng = new GeoPosition();
    }
    UserId: number;
    City: string;
    Address: string;
    LatLng: GeoPosition;
    Color: string;
}