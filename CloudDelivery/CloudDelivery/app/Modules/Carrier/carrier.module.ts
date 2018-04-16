import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CarrierRouting } from './carrier.routing';

import { CarrierDashboardComponent } from './dashboard/carrier.dashboard.component';
import { CarrierOrdersComponent } from './Orders/carrier.orders.component';
import { CarrierRoutesComponent } from './Routes/carrier.routes.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../Shared/shared.module';
import { AgmCoreModule } from '@agm/core';

const pages = [
    CarrierDashboardComponent,
    CarrierOrdersComponent,
    CarrierRoutesComponent
];

const modules = [
    CommonModule,
    RouterModule,
    FormsModule,
    NgxDatatableModule,
    SharedModule,
    AgmCoreModule
]

@NgModule({
    imports: [...modules, CarrierRouting],
    declarations: [...pages],
})
export class CarrierModule { }

