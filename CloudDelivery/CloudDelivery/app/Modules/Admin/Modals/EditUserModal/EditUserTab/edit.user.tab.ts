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

export class EditUserTab implements OnInit {

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

    changeName() {
        this.setElementState("Name", this.elementStateEnum.Saving);

        this.usersService.setName(this.model.Id, this.model.Name).subscribe(x => {

            this.setElementState("Name", this.elementStateEnum.Text);
        }, err => {
            this.cancelEditing("Name");
        });
    }

    changeOrganisation() {
        this.setElementState("Organisation", this.elementStateEnum.Saving);

        this.usersService.setOrganisation(this.model.Id, this.model.OrganisationId).subscribe(x => {
            if (this.model.OrganisationId != null)
                this.model.Organisation = this.organisationsList.find(x => x.Id == this.model.OrganisationId).Name;
            else
                this.model.Organisation = null;

            this.setElementState("Organisation", this.elementStateEnum.Text);
        }, err => {
            this.cancelEditing("Organisation");
        });
    }

    changeRoles() {
        this.setElementState("Roles", this.elementStateEnum.Saving);

        this.usersService.setRole(this.model.Id, this.model.Roles).subscribe(x => {

            this.setElementState("Roles", this.elementStateEnum.Text);
        }, err => {
            this.cancelEditing("Roles");
        });
    }

    changePhone() {
        this.setElementState("Phone", this.elementStateEnum.Saving);

        this.usersService.setPhone(this.model.Id, this.model.Phone).subscribe(x => {

            this.setElementState("Phone", this.elementStateEnum.Text);
        }, err => {
            this.cancelEditing("Phone");
        });
    }

    changeDescription() {
        this.setElementState("Description", this.elementStateEnum.Saving);

        this.usersService.setDescription(this.model.Id, this.model.Description).subscribe(x => {

            this.setElementState("Description", this.elementStateEnum.Text);
        }, err => {
            this.cancelEditing("Description");
        });
    }



    ngOnInit(): void {
        Object.assign(this.defaultValues, this.model);
    }


}