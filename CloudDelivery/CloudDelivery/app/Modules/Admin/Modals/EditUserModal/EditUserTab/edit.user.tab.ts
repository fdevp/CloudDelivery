import { Component, Input, OnInit } from '@angular/core';

import { UserDetails } from '../../../../../Models/Users/UserDetails'
import { FormElementState } from '../../../../../Models/Enums/FormElementState'
import { OrganisationListItem } from '../../../../../Models/Organisations/OrganisationListItem'

import { UsersService } from '../../../../../Services/UsersService'
import { OrganisationsService } from '../../../../../Services/OrganisationsService'

import { NullStringPipe } from '../../../../Shared/Pipes/NullStringPipe'
import { RoleNamePipe } from '../../../../Shared/Pipes/RoleNamePipe'


@Component({
    selector: 'edit-user-tab',
    templateUrl: './edit.user.tab.html',
})

export class EditUserTab implements OnInit{
    
    @Input() model: UserDetails;
    defaultValues: UserDetails = new UserDetails();

    formStates = new Array<FormElementState>();
    elementStateEnum = FormElementState;

    organisationsList: Array<OrganisationListItem>;
    rolesList: Array<string>;

    setElementState(element, state: FormElementState) {
        this.formStates[element] = state;
    }

    cancelEditing(element) {
        this.model[element] = this.defaultValues[element];
        this.setElementState(element, this.elementStateEnum.Text);
    }

    constructor(private usersService: UsersService, private organisationsService: OrganisationsService) {
        this.organisationsService.list().subscribe(list => {
            this.organisationsList = list;
        });

        this.rolesList = this.usersService.roles();


        this.formStates['Name'] = this.elementStateEnum.Text;
        this.formStates['Organisation'] = this.elementStateEnum.Text;
        this.formStates['Roles'] = this.elementStateEnum.Text;
        this.formStates['Phone'] = this.elementStateEnum.Text;
        this.formStates['Description'] = this.elementStateEnum.Text;
    }

    ngOnInit(): void {
        Object.assign(this.defaultValues, this.model);
    }

    
}