"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SessionService_1 = require("../SessionService");
var MenuFactoryService = /** @class */ (function () {
    function MenuFactoryService(sessionService) {
        this.sessionService = sessionService;
        this.adminMenu = [
            {
                'title': 'Panel',
                'icon': null,
                'link': ['./'],
            },
            {
                'title': 'Organizacja',
                'icon': null,
                'link': ['organisations']
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
        this.carrierMenu = [
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
        this.organisationMenu = [
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
        this.SalePointMenu = [
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
        ];
    }
    MenuFactoryService.prototype.getMenu = function () {
        if (this.sessionService.isAdmin())
            return this.adminMenu;
        else if (this.sessionService.hasRole("carrier"))
            return this.carrierMenu;
        else if (this.sessionService.hasRole("organisation"))
            return this.organisationMenu;
        else if (this.sessionService.hasRole("salepoint"))
            return this.SalePointMenu;
    };
    MenuFactoryService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [SessionService_1.SessionService])
    ], MenuFactoryService);
    return MenuFactoryService;
}());
exports.MenuFactoryService = MenuFactoryService;
//# sourceMappingURL=MenuFactoryService.js.map