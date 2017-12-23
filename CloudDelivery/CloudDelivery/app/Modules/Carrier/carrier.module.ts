import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CarrierRouting } from './carrier.routing';

import { CarrierDashboardComponent } from './dashboard/carrier.dashboard.component';
import { CarrierUsersComponent } from './users/carrier.users.component';


const pages = [
    CarrierDashboardComponent,
    CarrierUsersComponent
];

const modules = [
    CommonModule,
    RouterModule,
    FormsModule
]

@NgModule({
    imports: [...modules, CarrierRouting],
    declarations: [...pages],
})
export class CarrierModule { }

