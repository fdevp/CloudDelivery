﻿import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminRouting } from './admin.routing';

import { SharedModule } from '../Shared/shared.module'

import { AdminDashboardComponent } from './dashboard/admin.dashboard.component';
import { AdminUsersComponent } from './users/admin.users.component'
import { AdminOrganisationsComponent } from './organisations/admin.organisations.component'

import { UsersService } from '../../Services/UsersService';

import { AppModule } from '../../app.module'
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AdminComponent } from './admin.component';



const pages = [
    AdminDashboardComponent,
    AdminUsersComponent,
    AdminOrganisationsComponent,
    AdminComponent
];

const modules = [
    CommonModule,
    RouterModule,
    FormsModule,
    NgxDatatableModule,
    SharedModule
]


@NgModule({
    declarations: [...pages],
    imports: [...modules, AdminRouting],
})
export class AdminModule { }

