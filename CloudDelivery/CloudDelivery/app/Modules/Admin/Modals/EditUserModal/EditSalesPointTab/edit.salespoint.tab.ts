import { Component, Input } from '@angular/core';
import { UserDetails } from '../../../../../Models/Users/UserDetails'
import { FormElementState } from '../../../../../Models/Enums/FormElementState';
import { UsersService } from '../../../../../Services/UsersService';

@Component({
    selector: 'edit-salespoint-tab',
    templateUrl: './edit.salespoint.tab.html',
})

export class EditSalespointTab {
    @Input() userId: number;
    model: any;
    editModel: any;

    formStates = new Array<FormElementState>();
    elementStateEnum = FormElementState;


    constructor(private usersService: UsersService) {
        this.formStates['City'] = this.elementStateEnum.Text;
        this.formStates['Address'] = this.elementStateEnum.Text;
        this.formStates['Color'] = this.elementStateEnum.Text;
        this.formStates['LatLng'] = this.elementStateEnum.Text;
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