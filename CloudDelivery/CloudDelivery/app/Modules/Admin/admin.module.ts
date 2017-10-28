import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminRouting } from './admin.routing';


import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './dashboard/admin.dashboard.component';
import { AdminUsersComponent } from './users/admin.users.component'

import { LayoutHeaderComponent } from '../../Shared/Header/layout.header.component';

import { MenuService } from '../../Services/MenuService';
import { SharedModule } from '../../Shared/shared.module'


const pages = [
    AdminComponent,
    AdminDashboardComponent,
    AdminUsersComponent
];

const modules = [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule
]

const providers = [
    MenuService
]

@NgModule({
    imports: [...modules, AdminRouting],
    providers: [...providers],
    declarations: [...pages],
    bootstrap: [AdminComponent]
})
export class AdminModule { }

