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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var SessionService_1 = require("../Services/SessionService");
var core_2 = require("@agm/core");
require("rxjs/add/observable/of");
require("rxjs/Rx");
var GeoPosition_1 = require("../Models/GeoPosition");
var GMapsService = /** @class */ (function () {
    function GMapsService(http, sessionService, gmapsApi) {
        var _this = this;
        this.http = http;
        this.sessionService = sessionService;
        this.gmapsApi = gmapsApi;
        this.gmapsApi.load().then(function () {
            _this.geocoder = new google.maps.Geocoder();
        });
    }
    GMapsService.prototype.getPositionByQuery = function (query) {
        var _this = this;
        var service = this;
        return new Observable_1.Observable(function (obs) {
            _this.geocoder.geocode({ 'address': query }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var response = new GeoPosition_1.GeoPosition();
                    response.lat = results[0].geometry.location.lat();
                    response.lng = results[0].geometry.location.lng();
                    obs.next(response);
                }
                else {
                    obs.error(status);
                }
            });
        });
    };
    GMapsService.prototype.getBaseLocation = function () {
        return { "lat": 54.46414799999999, "lng": 17.02848240000003 };
    };
    GMapsService.prototype.getMarkerIcon = function () {
        return "/content/images/markers/small/marker.png";
    };
    GMapsService.prototype.getMarkerBwIcon = function () {
        return "/content/images/markers/small/marker_bw.png";
    };
    GMapsService = __decorate([
        core_1.Injectable(),
        __param(2, core_1.Inject(core_1.forwardRef(function () { return core_2.MapsAPILoader; }))),
        __metadata("design:paramtypes", [http_1.Http, SessionService_1.SessionService, core_2.MapsAPILoader])
    ], GMapsService);
    return GMapsService;
}());
exports.GMapsService = GMapsService;
//# sourceMappingURL=GMapsService.js.map