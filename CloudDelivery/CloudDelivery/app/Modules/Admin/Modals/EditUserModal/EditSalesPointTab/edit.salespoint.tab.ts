import { Component, Input } from '@angular/core';
import { UserDetails } from '../../../../../Models/Users/UserDetails'

@Component({
    selector: 'edit-salespoint-tab',
    templateUrl: './edit.salespoint.tab.html',
})

export class EditSalespointTab {
    @Input() model: UserDetails = new UserDetails();

    constructor() {

    }
}