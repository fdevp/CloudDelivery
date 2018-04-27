import { Component, Input, EventEmitter, Inject, forwardRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap'
import { UserDetails } from '../../../../Models/Users/UserDetails'
import { Organisation } from '../../../../Models/Organisations/Organisation'
import { UsersService } from '../../../../Services/Admin/UsersService'
import { OrganisationsService } from '../../../../Services/Admin/OrganisationsService'
import { ModalFactoryService } from '../../../../Services/UI/ModalFactoryService';
import { ToastFactoryService } from '../../../../Services/UI/ToastFactoryService';
import { FormElementState } from '../../../../Models/Enums/FormElementState';

@Component({
    selector: 'edit-organisation-modal',
    templateUrl: './edit.organisation.modal.html',
})

export class EditOrganisationModal {
    details: Organisation = new Organisation();
    detailsProgress: boolean = true;

    constructor(private bsModalRef: BsModalRef, private orgService: OrganisationsService) {

    }


    removeOrganisation() {
        

    }

    closeModal() {
        this.orgService.list();
        this.bsModalRef.hide();
    }

    initOrgDetails(organisation): void {
        this.details = organisation;
        this.detailsProgress = false;
    }
}