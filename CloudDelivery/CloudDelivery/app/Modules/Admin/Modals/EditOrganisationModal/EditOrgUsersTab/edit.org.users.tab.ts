import { Component, Input, OnInit } from "@angular/core";
import { Organisation } from "../../../../../Models/Organisations/Organisation";
import { OrganisationsService } from "../../../../../Services/Admin/OrganisationsService";
import { UserListItem } from "../../../../../Models/Users/UserListItem";
import { UsersService } from "../../../../../Services/Admin/UsersService";


@Component({
    selector: 'edit-org-users-tab',
    templateUrl: './edit.org.users.tab.html',
})

export class EditOrgUsersTab implements OnInit {
    @Input() orgId: number;

    members: Array<UserListItem> = new Array<UserListItem>();
    inProgress: boolean = true;

    constructor(private orgService: OrganisationsService, private usersService: UsersService) {

    }

    ngOnInit(): void {
        this.orgService.members(this.orgId).subscribe(list => {
            this.members = list;
            this.inProgress = false;
        }, err => {
            this.inProgress = false;
        });
    }


    removeMember(id) {
        this.usersService.setOrganisation(id, null).subscribe(response => {
            if (response) {
                var elementIndex = this.members.indexOf(this.members.find(x => x.Id == id));
                this.members.splice(elementIndex, 1);
            }

        }, err => {

        });
    }
}