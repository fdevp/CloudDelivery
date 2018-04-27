import { Injectable, EventEmitter } from "@angular/core";
import { SessionService } from "./SessionService";
import { RouteListItem } from "../Models/Routes/RouteListItem";
import { Observable } from "rxjs/Observable";
import { RouteDetails } from "../Models/Routes/RouteDetails";
import { Http } from "@angular/http";
import { Observer } from "rxjs";

@Injectable()
export class RoutesService {
    public routesListChanged: EventEmitter<RouteListItem[]> = new EventEmitter();

    private routesList: RouteListItem[];

    constructor(protected http: Http, protected sessionService: SessionService) {

    }

    list(refresh: boolean): Observable<Array<RouteListItem>> {
        if (this.routesList != null && refresh == false) {
            return Observable.of(this.routesList);
        }

        var headers = this.sessionService.authHeader();
        return new Observable((obs: Observer<Array<RouteListItem>>) => {
            return this.http.get('/api/routes/list', { headers: headers }).subscribe(data => {

                var body = JSON.parse(data["_body"]);
                this.routesList = body;

                this.routesListChanged.emit(this.routesList);
                obs.next(body);

            }, e => { console.error("err", e); })
        });
    }

    details(routeId): Observable<RouteDetails> {
        var headers = this.sessionService.authHeader();

        var path = '/api/routes/details/' + routeId;

        return new Observable((obs: Observer<RouteDetails>) => {
            return this.http.get(path, { headers: headers }).subscribe(data => {
                var body = JSON.parse(data["_body"]);
                this.getRoutePointLocationObjects(body);
                obs.next(body);
            }, e => { console.error("err", e); })
        });
    }

    getRoutePointLocationObjects(route: any) {
        for (let point of route.Points) {

            if (point.Order.EndLatLng != null) {
                try {
                    point.Order.EndLatLng = JSON.parse(point.Order.EndLatLng);
                } catch (ex) { console.error("err,", ex); }
            }

            if (point.Order.SalepointLatLng != null) {

                try {
                    point.Order.SalepointLatLng = JSON.parse(point.Order.SalepointLatLng);
                } catch (ex) { console.error("err,", ex); }

            }
        }
    }
}