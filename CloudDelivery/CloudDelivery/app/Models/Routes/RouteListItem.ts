import { RouteStatus } from "../Enums/RouteStatus";

export interface RouteListItem {
    Id: number;

    CarrierId: number;
    CarrierName: string;

    Status: RouteStatus;
    AddedTime: Date;
    FinishTime: Date;

    RoutePointsCount: number;
    Duration: number;
}