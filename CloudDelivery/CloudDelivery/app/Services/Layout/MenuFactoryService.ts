import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SessionService } from "../SessionService"
import { MenuItem } from '../../Models/MenuItem';

@Injectable()
export class MenuFactoryService {
    constructor(private sessionService: SessionService) { }

    private adminMenu = [
        {
            'title': 'Panel',
            'icon': null,
            'link': ['./'],
        },
        {
            'title': 'Organizacja',
            'icon': null,
            'link':['organisations']
            //'sublinks': [
            //    {
            //        'title': 'Moja',
            //        'icon': null,
            //        'link': ['/'],
            //    },
            //    {
            //        'title': 'Wszystkie',
            //        'icon': null,
            //        'link': ['organisations'],
            //    }
            //]
        },
        {
            'title': 'Użytkownicy',
            'icon': null,
            'link': ['users'],
        },
        {
            'title': 'Dostawy',
            'icon': null,
            'link': ['/'],
        },
    ];

    private carrierMenu = [
        {
            'title': 'Panel',
            'icon': null,
            'link': ['/']
        },
        {
            'title': 'Organizacja',
            'icon': null,
            'link': ['/', '/home']
        },
        {
            'title': 'Dostawy',
            'icon': null,
            'link': ['users']
        }
    ];


    private organisationMenu = [
        {
            'title': 'Panel',
            'icon': null,
            'link': ['/', '/home']
        },
        {
            'title': 'Organizacja',
            'icon': null,
            'link': ['/', '/home']
        },
        {
            'title': 'Użytkownicy',
            'icon': null,
            'link': ['/', '/home']
        },
        {
            'title': 'Dostawy',
            'icon': null,
            'link': ['/', '/home']
        }
    ];

    private SalePointMenu = [
        {
            'title': 'Panel',
            'icon': null,
            'link': ['/', '/home']
        },
        {
            'title': 'Organizacja',
            'icon': null,
            'link': ['/', '/home']
        },
        {
            'title': 'Użytkownicy',
            'icon': null,
            'link': ['/', '/home']
        },
        {
            'title': 'Organizacje',
            'icon': null,
            'link': ['/', '/home']
        },
        {
            'title': 'Zamów',
            'icon': null,
            'link': ['/', '/home']
        },
        {
            'title': 'Dostawy',
            'icon': null,
            'link': ['/', '/home']
        },
    ]


    public getMenu(): Array<MenuItem> {
        if (this.sessionService.isAdmin())
            return this.adminMenu;
        else if (this.sessionService.hasRole("carrier"))
            return this.carrierMenu;
        else if (this.sessionService.hasRole("organisation"))
            return this.organisationMenu;
        else if (this.sessionService.hasRole("salepoint"))
            return this.SalePointMenu;
    }
}