import { Component, Input, EventEmitter, Inject, forwardRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap'
import { UserDetails } from '../../../../Models/Users/UserDetails'
import { OrganisationListItem } from '../../../../Models/Organisations/OrganisationListItem'
import { UsersService } from '../../../../Services/UsersService'
import { OrganisationsService } from '../../../../Services/OrganisationsService'
import { ModalFactoryService } from '../../../../Services/Layout/ModalFactoryService';
import { ToastFactoryService } from '../../../../Services/Layout/ToastFactoryService';
import { Organisation } from '../../../../Models/Organisations/Organisation';
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