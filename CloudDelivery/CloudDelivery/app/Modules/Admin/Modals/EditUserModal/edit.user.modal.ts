import { Component, Input, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap'
import { UserDetails } from '../../../../Models/Users/UserDetails'
import { OrganisationListItem } from '../../../../Models/Organisations/OrganisationListItem'
import { UsersService } from '../../../../Services/UsersService'
import { OrganisationsService } from '../../../../Services/OrganisationsService'

@Component({
    selector: 'edit-user-modal',
    templateUrl: './edit.user.modal.html',
    styleUrls: ['./edit-user-modal.css']
})

export class EditUserModal {
    details: UserDetails = new UserDetails();
    userId: number;

    detailsProgress: boolean = true;

    constructor(public bsModalRef: BsModalRef, public usersService: UsersService, public orgService: OrganisationsService) {

    }


    removeUser() {

        this.bsModalRef.hide();
    }

    initUserDetails(userId): void {
        this.userId = userId;

        this.orgService.list().subscribe((orgList: Array<OrganisationListItem>) => {
            console.warn("ORG LIST", orgList);
        });

        this.usersService.details(this.userId).subscribe((userDetails: UserDetails) => {
            this.details = userDetails;
            this.detailsProgress = false;
        });

    }
}