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
var Roles_1 = require("../../Models/Enums/Roles");
var MenuFactoryService = /** @class */ (function () {
    function MenuFactoryService(sessionService) {
        this.sessionService = sessionService;
        this.adminMenu = [
            {
                'title': 'Panel',
                'icon': 'th',
                'link': ['./'],
            },
            {
                'title': 'Organizacje',
                'icon': 'building',
                'link': ['organisations']
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
                'link': ['routes'],
            },
        ];
        this.carrierMenu = [
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
        this.organisationMenu = [
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
        this.salePointMenu = [
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
    }
    MenuFactoryService.prototype.getMenu = function () {
        if (this.sessionService.isAdmin())
            return this.adminMenu;
        else if (this.sessionService.hasRole(Roles_1.Roles.Carrier))
            return this.carrierMenu;
        else if (this.sessionService.hasRole(Roles_1.Roles.Organisation))
            return this.organisationMenu;
        else if (this.sessionService.hasRole(Roles_1.Roles.SalePoint))
            return this.salePointMenu;
    };
    MenuFactoryService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [SessionService_1.SessionService])
    ], MenuFactoryService);
    return MenuFactoryService;
}());
exports.MenuFactoryService = MenuFactoryService;
//# sourceMappingURL=MenuFactoryService.js.map