"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var OrdersService = /** @class */ (function () {
    function OrdersService(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.countersIncrease = new core_1.EventEmitter();
    }
    OrdersService.prototype.list = function (filters) {
        var _this = this;
        var headers = this.sessionService.authHeader();
        headers.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        var body = "=" + JSON.stringify(filters);
        ;
        return new Observable_1.Observable(function (obs) {
            return _this.http.get('/api/orders/list', { headers: headers }).subscribe(function (data) {
                var body = JSON.parse(data["_body"]);
                console.warn("lista orders", body);
                obs.next(body);
            }, function (e) { console.error("err", e); });
        });
    };
    ;
    OrdersService.prototype.details = function (orderId) {
        var _this = this;
        var headers = this.sessionService.authHeader();
        var path = '/api/orders/details/' + orderId;
        return new Observable_1.Observable(function (obs) {
            return _this.http.get(path, { headers: headers }).subscribe(function (data) {
                var body = JSON.parse(data["_body"]);
                _this.getLocationObject(body);
                obs.next(body);
            }, function (e) { console.error("err", e); });
        });
    };
    ;
    OrdersService.prototype.discard = function (orderId) {
        var _this = this;
        var headers = this.sessionService.authHeader();
        return new Observable_1.Observable(function (obs) {
            return _this.http.get('/api/orders/discard', { headers: headers }).subscribe(function (data) {
                var body = JSON.parse(data["_body"]);
                obs.next(body);
            }, function (e) { console.error("err", e); });
        });
    };
    ;
    OrdersService.prototype.getLocationArray = function (orders) {
        for (var i = 0; i < orders.length; i++) {
            var order = orders[i];
            //endlatlng
            if (order.EndLatLng == "" || order.EndLatLng == null)
                continue;
            try {
                order.EndLatLng = JSON.parse(order.EndLatLng);
            }
            catch (ex) {
                console.warn("err,", ex);
            }
            //salepoint
            if (order.SalepointLatLng == "" || order.SalepointLatLng == null)
                continue;
            try {
                order.SalepointLatLng = JSON.parse(order.SalepointLatLng);
            }
            catch (ex) {
                console.warn("err,", ex);
            }
        }
    };
    OrdersService.prototype.getLocationObject = function (order) {
        if (order.EndLatLng != null) {
            try {
                order.EndLatLng = JSON.parse(order.EndLatLng);
            }
            catch (ex) {
                console.warn("err,", ex);
            }
        }
        if (order.SalepointLatLng != null) {
            try {
                order.SalepointLatLng = JSON.parse(order.SalepointLatLng);
            }
            catch (ex) {
                console.warn("err,", ex);
            }
        }
    };
    return OrdersService;
}());
exports.OrdersService = OrdersService;
//# sourceMappingURL=OrdersService.js.map