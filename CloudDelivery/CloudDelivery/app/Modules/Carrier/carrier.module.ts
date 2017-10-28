import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CarrierRouting } from './carrier.routing';


import { CarrierComponent } from './carrier.component';
import { CarrierDashboardComponent } from './dashboard/carrier.dashboard.component';
import { CarrierUsersComponent } from './users/carrier.users.component';

import { LayoutHeaderComponent } from '../../Shared/Header/layout.header.component';

import { MenuService } from '../../Services/MenuService';
import { SharedModule } from '../../Shared/shared.module'


const pages = [
    CarrierComponent,
    CarrierDashboardComponent,
    CarrierUsersComponent
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
    imports: [...modules, CarrierRouting],
    providers: [...providers],
    declarations: [...pages],
    bootstrap: [CarrierComponent]
})
export class CarrierModule { }

