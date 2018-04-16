import { OrderStatus } from "../Enums/OrderStatus";

export class OrdersCountFilters {
    CarrierUserId: number;
    SalePointUserId: number;
    OrganisationId: number;

    StartTime: string;
    EndTime: string;


    AddedTimeStart: string;
    AddedTimeEnd: string;

    AcceptedTimeStart: string;
    AcceptedTimeEnd: string;

    Status: OrderStatus[];
}