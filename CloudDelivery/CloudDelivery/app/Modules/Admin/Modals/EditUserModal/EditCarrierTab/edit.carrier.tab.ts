import { Component, Input, OnInit } from '@angular/core';
import { ShowPasswordDirective } from '../../../../Shared/Directives/ShowPasswordDirective'
import { UsersService } from '../../../../../Services/UsersService';
import { UserDetails } from '../../../../../Models/Users/UserDetails';
import { ToastFactoryService } from '../../../../../Services/Layout/ToastFactoryService';
import { FormElementState } from '../../../../../Models/Enums/FormElementState';
import { Carrier } from '../../../../../Models/Carriers/Carrier';
import { CarriersService } from '../../../../../Services/CarriersService';

@Component({
    selector: 'edit-carrier-tab',
    templateUrl: './edit.carrier.tab.html',
})

export class EditCarrierTab implements OnInit  {
    @Input() userId: number;
    model: Carrier = new Carrier();
    editModel: Carrier = new Carrier();

    formStates = new Array<FormElementState>();
    elementStateEnum = FormElementState;

    dataLoading: boolean = true;

    constructor(private carrierService: CarriersService) {
        this.formStates['Color'] = this.elementStateEnum.Text;
    }

    ngOnInit(): void {
        this.carrierService.details(this.userId).subscribe(details => {
            this.model = details;
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

    changeColor() {
        this.setElementState("Color", this.elementStateEnum.Saving);

        this.carrierService.setColor(this.userId, this.editModel.Color).subscribe(x => {
            this.model.Color = this.editModel.Color;
            this.setElementState("Color", this.elementStateEnum.Text);
        }, err => {
            this.cancelEditing("Color");
        });
    }

}