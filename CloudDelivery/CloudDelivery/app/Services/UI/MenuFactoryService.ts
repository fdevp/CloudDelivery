import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SessionService } from "../SessionService"
import { MenuItem } from '../../Models/MenuItem';
import { Roles } from '../../Models/Enums/Roles';

@Injectable()
export class MenuFactoryService {
    constructor(private sessionService: SessionService) { }

    private adminMenu = [
        {
            'title': 'Panel',
            'icon': 'th',
            'link': ['./'],
        },
        {
            'title': 'Organizacje',
            'icon': 'building',
            'link':['organisations']
        },
        {
            'title': 'Użytkownicy',
            'icon': 'users',
            'link': ['users'],
        },
        {
            'title': 'Zamówienia',
            'icon': 'map-marker',
            'link': ['orders'],
        },
        {
            'title': 'Trasy',
            'icon': 'truck',
            'link': ['./'],
        },
    ];

    private carrierMenu = [
        {
            'title': 'Panel',
            'icon': 'th',
            'link': ['./'],
        },
        {
            'title': 'Zamówienia',
            'icon': 'map-marker',
            'link': ['orders'],
        },
        {
            'title': 'Trasy',
            'icon': 'truck',
            'link': ['./'],
        },
    ];


    private organisationMenu = [
        {
            'title': 'Panel',
            'icon': 'th',
            'link': ['./'],
        },
        {
            'title': 'Zamówienia',
            'icon': 'map-marker',
            'link': ['orders'],
        },
    ];

    private salePointMenu = [
        {
            'title': 'Panel',
            'icon': 'th',
            'link': ['./'],
        },
        {
            'title': 'Zamówienia',
            'icon': 'map-marker',
            'link': ['orders'],
        },
    ]


    public getMenu(): Array<MenuItem> {
        if (this.sessionService.isAdmin())
            return this.adminMenu;
        else if (this.sessionService.hasRole(Roles.Carrier))
            return this.carrierMenu;
        else if (this.sessionService.hasRole(Roles.Organisation))
            return this.organisationMenu;
        else if (this.sessionService.hasRole(Roles.SalePoint))
            return this.salePointMenu;
    }
}