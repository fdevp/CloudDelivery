import { Component, Input, OnInit } from '@angular/core';

import { UserDetails } from '../../../../../Models/Users/UserDetails'
import { FormElementState } from '../../../../../Models/Enums/FormElementState'

import { UsersService } from '../../../../../Services/UsersService'
import { OrganisationsService } from '../../../../../Services/OrganisationsService'

import { NullStringPipe } from '../../../../Shared/Pipes/NullStringPipe'
import { RoleNamePipe } from '../../../../Shared/Pipes/RoleNamePipe'
import { Organisation } from '../../../../../Models/Organisations/Organisation';


@Component({
    selector: 'edit-user-tab',
    templateUrl: './edit.user.tab.html',
})

export class EditUserTab implements OnInit {

    @Input() model: UserDetails;
    editModel: UserDetails = new UserDetails();

    formStates = new Array<FormElementState>();
    elementStateEnum = FormElementState;

    organisationsList: Array<Organisation>;
    rolesList: Array<string>;


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
        Object.assign(this.editModel, this.model);
    }

    setElementState(element, state: FormElementState) {
        this.formStates[element] = state;
    }

    cancelEditing(element) {
        this.editModel[element] = this.model[element];
        this.setElementState(element, this.elementStateEnum.Text);
    }


    changeName() {
        this.setElementState("Name", this.elementStateEnum.Saving);

        this.usersService.setName(this.model.Id, this.editModel.Name).subscribe(x => {
            this.model.Name = this.editModel.Name;
            this.setElementState("Name", this.elementStateEnum.Text);
        }, err => {
            this.cancelEditing("Name");
        });
    }

    changeOrganisation() {
        this.setElementState("Organisation", this.elementStateEnum.Saving);

        this.usersService.setOrganisation(this.model.Id, this.editModel.OrganisationId).subscribe(x => {
            this.model.OrganisationId = this.editModel.OrganisationId;
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

        this.usersService.setRole(this.model.Id, this.editModel.Roles).subscribe(x => {
            this.model.Roles = this.editModel.Roles;
            this.setElementState("Roles", this.elementStateEnum.Text);
        }, err => {
            this.cancelEditing("Roles");
        });
    }

    changePhone() {
        this.setElementState("Phone", this.elementStateEnum.Saving);

        this.usersService.setPhone(this.model.Id, this.editModel.Phone).subscribe(x => {
            this.model.Phone = this.editModel.Phone;
            this.setElementState("Phone", this.elementStateEnum.Text);
        }, err => {
            this.cancelEditing("Phone");
        });
    }

    changeDescription() {
        this.setElementState("Description", this.elementStateEnum.Saving);

        this.usersService.setDescription(this.model.Id, this.editModel.Description).subscribe(x => {
            this.model.Description = this.editModel.Description;
            this.setElementState("Description", this.elementStateEnum.Text);
        }, err => {
            this.cancelEditing("Description");
        });
    }

}