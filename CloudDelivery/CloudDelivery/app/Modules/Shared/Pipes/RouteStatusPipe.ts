import { Pipe, PipeTransform } from '@angular/core';
import { RouteStatus } from '../../../Models/Enums/RouteStatus';

@Pipe({ name: 'routeStatus' })
export class RouteStatusPipe implements PipeTransform {
    constructor() {

    }

    transform(value: RouteStatus) {
        var name = "";
        switch (value) {
            case RouteStatus.Active:
                name = "Aktywna";
                break;
            case RouteStatus.Finished:
                name = "Zakończona";
                break;
        }
        return name;
    }
}