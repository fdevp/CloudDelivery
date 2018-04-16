import { Injectable, forwardRef, Inject, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { SessionService } from '../Services/SessionService'
import { GoogleMapsAPIWrapper, MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';

import 'rxjs/add/observable/of';
import 'rxjs/Rx';
import { GeoPosition } from '../Models/GeoPosition';


@Injectable()
export class GMapsService {
    geocoder: google.maps.Geocoder;

    constructor(private http: Http, private sessionService: SessionService, @Inject(forwardRef(() => MapsAPILoader)) private gmapsApi: MapsAPILoader) {
        this.gmapsApi.load().then(() => {
            this.geocoder = new google.maps.Geocoder();
        });
    }

    getPositionByQuery(query: string): Observable<GeoPosition> {
        var service = this;
        return new Observable((obs: Observer<GeoPosition>) => {
            this.geocoder.geocode({ 'address': query }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {

                    var response: GeoPosition = new GeoPosition();
                    response.lat = results[0].geometry.location.lat();
                    response.lng = results[0].geometry.location.lng();
                    obs.next(response);

                } else {
                    obs.error(status);
                }


            });
        });
    }

    getBaseLocation(): GeoPosition {
        return { "lat": 54.46414799999999, "lng": 17.02848240000003 };
    }

    getMarkerIcon() {
        return "/content/images/markers/small/marker.png";
    }

    getMarkerBwIcon() {
        return "/content/images/markers/small/marker_bw.png";
    }
}