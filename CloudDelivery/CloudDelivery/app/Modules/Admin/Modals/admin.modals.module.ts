import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddUserModal } from './AddUserModal/add.user.modal'
import { EditUserModal } from './EditUserModal/edit.user.modal'
import { EditSalespointTab } from './EditUserModal/EditSalesPointTab/edit.salespoint.tab';
import { EditPasswordTab } from './EditUserModal/EditPasswordTab/edit.password.tab';
import { EditUserTab } from './EditUserModal/EditUserTab/edit.user.tab';
import { SharedModule } from '../../Shared/shared.module';


const pages = [
    AddUserModal,
    EditUserModal
];

const tabs = [
    EditPasswordTab,
    EditSalespointTab,
    EditUserTab
];

const modules = [
    CommonModule,
    RouterModule,
    FormsModule,
    TabsModule,
    SharedModule
];


@NgModule({
    imports: [...modules],
    declarations: [...pages, tabs],
    exports: [...pages],
    entryComponents:[...pages]

})
export class AdminModalsModule { }

