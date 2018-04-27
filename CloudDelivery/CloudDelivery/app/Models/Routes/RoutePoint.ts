import { RoutePointType } from "../Enums/RoutePointType";
import { RoutePointOrder } from "./RoutePointOrder";

export interface RoutePoint {
    Id: number;
    Index: number;
    Type: RoutePointType;

    PassedTime: Date;

    OrderId: number;
    Order: RoutePointOrder;
}