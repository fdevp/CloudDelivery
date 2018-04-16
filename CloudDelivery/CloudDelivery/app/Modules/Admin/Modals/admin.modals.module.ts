import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddUserModal } from './AddUserModal/add.user.modal'
import { EditUserModal } from './EditUserModal/edit.user.modal'
import { EditSalePointTab } from './EditUserModal/EditSalePointTab/edit.SalePoint.tab';
import { EditCarrierTab } from './EditUserModal/EditCarrierTab/edit.carrier.tab';
import { EditPasswordTab } from './EditUserModal/EditPasswordTab/edit.password.tab';
import { EditUserTab } from './EditUserModal/EditUserTab/edit.user.tab';
import { SharedModule } from '../../Shared/shared.module';
import { AddOrganisationModal } from './AddOrganisationModal/add.organisation.modal';
import { EditOrganisationModal } from './EditOrganisationModal/edit.organisation.modal';
import { EditOrganisationTab } from './EditOrganisationModal/EditOrgTab/edit.Organisation.tab';
import { EditOrgUsersTab } from './EditOrganisationModal/EditOrgUsersTab/edit.org.users.tab';
import { AgmCoreModule } from '@agm/core';
import { UsersService } from '../../../Services/Admin/UsersService';
import { OrganisationsService } from '../../../Services/Admin/OrganisationsService';
import { CarriersService } from '../../../Services/Admin/CarriersService';
import { SalePointsService } from '../../../Services/Admin/SalepointsService';

const pages = [
    AddUserModal,
    EditUserModal,
    AddOrganisationModal,
    EditOrganisationModal
];

const tabs = [
    EditPasswordTab,
    EditSalePointTab,
    EditUserTab,
    EditCarrierTab,
    EditOrganisationTab,
    EditOrgUsersTab
];

const modules = [
    CommonModule,
    RouterModule,
    FormsModule,
    TabsModule,
    SharedModule,
    AgmCoreModule
];


const providers = [

]


@NgModule({
    providers: [...providers],
    imports: [...modules],
    declarations: [...pages, tabs],
    exports: [...pages],
    entryComponents:[...pages]

})
export class AdminModalsModule { }

