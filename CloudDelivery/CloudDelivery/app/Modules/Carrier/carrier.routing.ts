import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { CarrierComponent } from './carrier.component'
import { CarrierDashboardComponent } from './dashboard/carrier.dashboard.component'
import { CarrierGuard } from '../../Services/Guards/CarrierGuard';
import { CarrierRoutesComponent } from './Routes/carrier.routes.component';
import { CarrierOrdersComponent } from './Orders/carrier.orders.component';
import { SettingsComponent } from '../Shared/Components/Settings/settings.component';

const carrierRoutes: Routes = [
    {
        path: '',
        canActivateChild: [CarrierGuard],
        children: [
            {
                path: 'routes',
                component: CarrierRoutesComponent
            },
            {
                path: 'orders',
                component: CarrierOrdersComponent
            },
            {
                path: 'settings',
                component: SettingsComponent
            },
            {
                component: CarrierDashboardComponent,
                path: '',
            }
        ],
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(
            carrierRoutes
        )
    ],
    exports: [
        RouterModule
    ]
})
export class CarrierRouting { }