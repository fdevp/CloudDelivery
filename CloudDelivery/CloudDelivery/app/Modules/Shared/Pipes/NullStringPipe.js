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
var platform_browser_1 = require("@angular/platform-browser");
var NullStringPipe = /** @class */ (function () {
    function NullStringPipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    NullStringPipe.prototype.transform = function (value) {
        var content = "<span class='text-muted'><em>brak</em></span>";
        if (value == null || value == 'undefined')
            return this.sanitizer.bypassSecurityTrustHtml(content);
        return value;
    };
    NullStringPipe = __decorate([
        core_1.Pipe({ name: 'nullString' }),
        __metadata("design:paramtypes", [platform_browser_1.DomSanitizer])
    ], NullStringPipe);
    return NullStringPipe;
}());
exports.NullStringPipe = NullStringPipe;
//# sourceMappingURL=NullStringPipe.js.map