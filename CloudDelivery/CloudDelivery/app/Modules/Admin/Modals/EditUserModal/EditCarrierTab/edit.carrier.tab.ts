import { Component, Input, OnInit } from '@angular/core';
import { ShowPasswordDirective } from '../../../../Shared/Directives/ShowPasswordDirective'
import { UsersService } from '../../../../../Services/UsersService';
import { UserDetails } from '../../../../../Models/Users/UserDetails';
import { ToastFactoryService } from '../../../../../Services/Layout/ToastFactoryService';
import { FormElementState } from '../../../../../Models/Enums/FormElementState';

@Component({
    selector: 'edit-carrier-tab',
    templateUrl: './edit.carrier.tab.html',
})

export class EditCarrierTab implements OnInit  {
    @Input() userId: number;
    model: any;
    editModel: any;

    formStates = new Array<FormElementState>();
    elementStateEnum = FormElementState;


    constructor(private usersService: UsersService) {
        this.formStates['Name'] = this.elementStateEnum.Text;
        this.formStates['Organisation'] = this.elementStateEnum.Text;
        this.formStates['Roles'] = this.elementStateEnum.Text;
        this.formStates['Phone'] = this.elementStateEnum.Text;
        this.formStates['Description'] = this.elementStateEnum.Text;
    }

    ngOnInit(): void {
        Object.assign(this.editModel, this.model);
    }

    setElementState(element, state: FormElementState) {
        this.formStates[element] = state;
    }

    cancelEditing(element) {
        this.editModel[element] = this.model[element];
        this.setElementState(element, this.elementStateEnum.Text);
    }



}