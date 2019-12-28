"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var layout_navigation_component_1 = require("./Components/Navigation/layout.navigation.component");
var NullStringPipe_1 = require("./Pipes/NullStringPipe");
var RoleNamePipe_1 = require("./Pipes/RoleNamePipe");
var ShortDateTimePipe_1 = require("./Pipes/ShortDateTimePipe");
var DestinationAddressPipe_1 = require("./Pipes/DestinationAddressPipe");
var OrderStatusPipe_1 = require("./Pipes/OrderStatusPipe");
var ShowPasswordDirective_1 = require("./Directives/ShowPasswordDirective");
var CurrencyTextPipe_1 = require("./Pipes/CurrencyTextPipe");
var order_details_modal_1 = require("./Modals/OrderDetailsModal/order.details.modal");
var ConfirmModal_1 = require("./Modals/ConfirmModal");
var DurationTextPipe_1 = require("./Pipes/DurationTextPipe");
var SalepointAddressPipe_1 = require("./Pipes/SalepointAddressPipe");
var core_2 = require("@agm/core");
var RouteStatusPipe_1 = require("./Pipes/RouteStatusPipe");
var route_details_component_1 = require("./Components/RouteDetails/route.details.component");
var settings_component_1 = require("./Components/Settings/settings.component");
var modules = [
    common_1.CommonModule,
    router_1.RouterModule,
    forms_1.FormsModule,
    core_2.AgmCoreModule
];
var pages = [
    layout_navigation_component_1.LayoutNavigationComponent,
    route_details_component_1.RouteDetailsComponent,
    settings_component_1.SettingsComponent
];
var directives = [
    ShowPasswordDirective_1.ShowPasswordDirective
];
var modals = [
    ConfirmModal_1.ConfirmModal,
    order_details_modal_1.OrderDetailsModal
];
var pipes = [
    NullStringPipe_1.NullStringPipe,
    RoleNamePipe_1.RoleNamePipe,
    ShortDateTimePipe_1.ShortDateTimePipe,
    DestinationAddressPipe_1.DestinationAddressPipe,
    OrderStatusPipe_1.OrderStatusPipe,
    CurrencyTextPipe_1.CurrencyTextPipe,
    DurationTextPipe_1.DurationTextPipe,
    SalepointAddressPipe_1.SalepointAddressPipe,
    RouteStatusPipe_1.RouteStatusPipe
];
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            imports: modules.slice(),
            declarations: pages.concat(pipes, directives, modals),
            exports: pages.concat(pipes, directives),
            entryComponents: modals.slice()
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map