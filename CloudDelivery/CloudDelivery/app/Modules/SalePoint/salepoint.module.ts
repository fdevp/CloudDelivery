import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SalepointRouting } from './salepoint.routing';

import { SalepointDashboardComponent } from './dashboard/salepoint.dashboard.component';
import { SalepointOrdersComponent } from './orders/salepoint.orders.component';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SalepointComponent } from './salepoint.component';
import { SharedModule } from '../Shared/shared.module';
import { TabsModule } from 'ngx-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { SalepointCreateOrderComponent } from './Orders/CreateOrder/salepoint.createorder.component';
import { GMapsService } from '../../Services/GMapsService';

const pages = [
    SalepointDashboardComponent,
    SalepointOrdersComponent,
    SalepointComponent,
    SalepointCreateOrderComponent
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
    imports: [...modules, SalepointRouting],
    declarations: [...pages],
})
export class SalepointModule { }

