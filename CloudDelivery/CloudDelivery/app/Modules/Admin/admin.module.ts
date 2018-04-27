import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminRouting } from './admin.routing';

import { SharedModule } from '../Shared/shared.module'

import { AdminDashboardComponent } from './dashboard/admin.dashboard.component';
import { AdminUsersComponent } from './users/admin.users.component'
import { AdminOrdersComponent } from './orders/admin.orders.component'
import { AdminOrganisationsComponent } from './organisations/admin.organisations.component'

import { UsersService } from '../../Services/Admin/UsersService';

import { AppModule } from '../../app.module'
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AdminComponent } from './admin.component';
import { ToastFactoryService } from '../../Services/UI/ToastFactoryService';
import { OrganisationsService } from '../../Services/Admin/OrganisationsService';
import { SalePointsService } from '../../Services/Admin/SalepointsService';
import { CarriersService } from '../../Services/Admin/CarriersService';
import { AgmCoreModule } from '@agm/core';
import { AdminRoutesComponent } from './Routes/admin.routes.component';


const pages = [
    AdminDashboardComponent,
    AdminUsersComponent,
    AdminOrdersComponent,
    AdminRoutesComponent,
    AdminOrganisationsComponent,
    AdminComponent
];

const modules = [
    CommonModule,
    RouterModule,
    FormsModule,
    NgxDatatableModule,
    SharedModule,
    AgmCoreModule,
]

const providers = [
    UsersService,
    OrganisationsService,
    SalePointsService,
    CarriersService
]

@NgModule({
    providers: [...providers],
    declarations: [...pages],
    imports: [...modules, AdminRouting],
})
export class AdminModule { }

