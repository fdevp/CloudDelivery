import { Component, Input, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { FormElementState } from '../../../../../Models/Enums/FormElementState';
import { SalepointsService } from '../../../../../Services/SalepointsService';
import { Salepoint } from '../../../../../Models/Salepoints/Salepoint';
import { GeoPosition } from '../../../../../Models/GeoPosition';
import { GMapsService } from '../../../../../Services/GMapsService';
import { Marker } from '@agm/core/services/google-maps-types';
import { AgmMap, AgmMarker } from '@agm/core';

@Component({
    selector: 'edit-salepoint-tab',
    templateUrl: './edit.salepoint.tab.html',
})

export class EditSalepointTab implements OnInit  {
    

    @Input() userId: number;
    model: Salepoint = new Salepoint();
    editModel: Salepoint = new Salepoint();

    @ViewChild(AgmMap) agmMap: AgmMap;
    @ViewChild(AgmMarker) positionMarker: AgmMarker;

    defaultPosition: GeoPosition;

    formStates = new Array<FormElementState>();
    elementStateEnum = FormElementState;

    dataLoading: boolean = true;
    latlngMarker: Marker;

    searchQuery: string;
    querySearchProgress: boolean = false;
    addressSearchProgress: boolean = false;


    constructor(private salepointsService: SalepointsService, private gmapsService: GMapsService) {
        this.formStates['City'] = this.elementStateEnum.Text;
        this.formStates['Address'] = this.elementStateEnum.Text;
        this.formStates['Color'] = this.elementStateEnum.Text;
        this.formStates['LatLng'] = this.elementStateEnum.Text;

        this.editModel.LatLng = gmapsService.getBaseLocation();
    }

    ngOnInit(): void {
        var baseLoc = this.gmapsService.getBaseLocation();

        this.salepointsService.details(this.userId).subscribe(details => {
            this.model = details;
            if (this.model.LatLng == null) {
                console.log("wszed", this.model);
                this.model.LatLng = this.gmapsService.getBaseLocation();
            }
            if (typeof this.model.LatLng === "string" || this.model.LatLng instanceof String) {
                this.model.LatLng = JSON.parse(this.model.LatLng + "");
            }

            Object.assign(this.editModel, this.model);  

            this.dataLoading = false;
        }, err => { })
    }

    setElementState(element, state: FormElementState) {
        this.formStates[element] = state;
    }

    cancelEditing(element) {
        this.editModel[element] = this.model[element];
        this.setElementState(element, this.elementStateEnum.Text);
    }

    changeAddress() {
        this.setElementState("Address", this.elementStateEnum.Saving);

        this.salepointsService.setAddress(this.userId, this.editModel.Address).subscribe(x => {
            this.model.Address = this.editModel.Address;
            this.setElementState("Address", this.elementStateEnum.Text);
        }, err => {
            this.cancelEditing("Address");
        });
    }

    changeCity() {
        this.setElementState("City", this.elementStateEnum.Saving);

        this.salepointsService.setCity(this.userId, this.editModel.City).subscribe(x => {
            this.model.City = this.editModel.City;
            this.setElementState("City", this.elementStateEnum.Text);
        }, err => {
            this.cancelEditing("City");
        });
    }


    changeColor() {
        this.setElementState("Color", this.elementStateEnum.Saving);

        this.salepointsService.setColor(this.userId, this.editModel.Color).subscribe(x => {
            this.model.Color = this.editModel.Color;
            this.setElementState("Color", this.elementStateEnum.Text);
        }, err => {
            this.cancelEditing("Color");
        });
    }


    changeLatLng() {
        this.setElementState("LatLng", this.elementStateEnum.Saving);

        this.salepointsService.setLatLng(this.userId, this.editModel.LatLng).subscribe(x => {
            this.model.LatLng = this.editModel.LatLng;
            this.setElementState("LatLng", this.elementStateEnum.Text);
        }, err => {
            this.cancelEditing("LatLng");
        });
    }

    markerDragEnd(m, $event) {
        this.editModel.LatLng.lat = $event.coords.lat;
        this.editModel.LatLng.lng = $event.coords.lng;
    }

    findInputLocation() {
        if (this.searchQuery == null || this.searchQuery.length == 0)
            return;

        this.querySearchProgress = true;

        this.gmapsService.getPositionByQuery(this.searchQuery).subscribe(position => {
            this.editModel.LatLng = position;
            this.querySearchProgress = false;
        }, error => {
            this.querySearchProgress = false;
        });
    }

    findAddressLocation() {
        if (this.editModel.Address == null && this.editModel.City == null)
            return;

        this.addressSearchProgress = true;

        var query = this.editModel.Address + ", " + this.editModel.City;
        this.gmapsService.getPositionByQuery(query).subscribe(position => {
            this.editModel.LatLng = position;
            this.addressSearchProgress = false;
            
        }, error => {
            this.addressSearchProgress = false;
            });
    }
}