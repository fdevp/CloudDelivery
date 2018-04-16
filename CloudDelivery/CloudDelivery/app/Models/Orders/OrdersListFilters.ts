import { OrderStatus } from "../Enums/OrderStatus";

export class OrdersListFilters {
    PageIndex: number;
    PageSize: number;

    Query: string;

    CarrierUserId: number;
    SalePointUserId: number;
    OrganisationId: number;

    AddedTimeStart: Date;
    AddedTimeEnd: Date;

    DeliveredTimeStart: Date;
    DeliveredTimeEnd: Date;

    Status: OrderStatus[];

    DurationMin: number;
    DurationMax: number;

    PriorityMin: number;
    PriorityMax: number;

    PriceMin: number;
    PriceMax: number;
}