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
var layout_header_component_1 = require("./Header/layout.header.component");
var NullStringPipe_1 = require("./Pipes/NullStringPipe");
var RoleNamePipe_1 = require("./Pipes/RoleNamePipe");
var ShowPasswordDirective_1 = require("./Directives/ShowPasswordDirective");
var pages = [
    layout_header_component_1.LayoutHeaderComponent,
];
var directives = [
    ShowPasswordDirective_1.ShowPasswordDirective
];
var pipes = [
    NullStringPipe_1.NullStringPipe,
    RoleNamePipe_1.RoleNamePipe
];
var modules = [
    common_1.CommonModule,
    router_1.RouterModule,
    forms_1.FormsModule
];
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            imports: modules.slice(),
            declarations: pages.concat(pipes, directives),
            exports: pages.concat(pipes, directives),
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map