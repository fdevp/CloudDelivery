import { RouteStatus } from "../Enums/RouteStatus";
import { RoutePoint } from "./RoutePoint";

export interface RouteDetails {
    Id: number;

    CarrierId: number;
    CarrierName: string;

    Status: RouteStatus;
    AddedTime: Date;
    FinishTime: Date;

    RoutePointsCount: number;
    Duration: number;

    Points: Array<RoutePoint>;
}