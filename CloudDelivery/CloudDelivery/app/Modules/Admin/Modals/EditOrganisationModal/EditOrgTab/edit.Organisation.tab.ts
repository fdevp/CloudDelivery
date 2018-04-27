import { Component, Input, OnInit, Inject, forwardRef } from '@angular/core';

import { UserDetails } from '../../../../../Models/Users/UserDetails'
import { FormElementState } from '../../../../../Models/Enums/FormElementState'
import { Organisation } from '../../../../../Models/Organisations/Organisation'

import { UsersService } from '../../../../../Services/Admin/UsersService'
import { OrganisationsService } from '../../../../../Services/Admin/OrganisationsService'

import { NullStringPipe } from '../../../../Shared/Pipes/NullStringPipe'
import { RoleNamePipe } from '../../../../Shared/Pipes/RoleNamePipe'
import { BsModalRef } from 'ngx-bootstrap';
import { ModalFactoryService } from '../../../../../Services/UI/ModalFactoryService';
import { ToastFactoryService } from '../../../../../Services/UI/ToastFactoryService';


@Component({
    selector: 'edit-organisation-tab',
    templateUrl: './edit.organisation.tab.html',
})

export class EditOrganisationTab implements OnInit {

    @Input() model: Organisation;

    defaultValues: Organisation = new Organisation();
    detailsProgress: boolean = true;

    formStates = new Array<FormElementState>();
    elementStateEnum = FormElementState;

    setElementState(element, state: FormElementState) {
        this.formStates[element] = state;
    }

    cancelEditing(element) {
        this.model[element] = this.defaultValues[element];
        this.setElementState(element, this.elementStateEnum.Text);
    }


    constructor(private bsModalRef: BsModalRef, private orgService: OrganisationsService, private toastService: ToastFactoryService,
        @Inject(forwardRef(() => ModalFactoryService)) private modalService: ModalFactoryService) {

        this.formStates['Name'] = this.elementStateEnum.Text;
    }


    changeName() {
        this.setElementState("Name", this.elementStateEnum.Saving);

        this.orgService.setName(this.model.Id, this.model.Name).subscribe(x => {
            this.setElementState("Name", this.elementStateEnum.Text);
        }, err => {
            this.cancelEditing("Name");
        });
    }

    ngOnInit(): void {
        Object.assign(this.defaultValues, this.model);
    }

}