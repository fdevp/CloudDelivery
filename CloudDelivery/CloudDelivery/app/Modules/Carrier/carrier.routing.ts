import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { CarrierComponent } from './carrier.component'
import { CarrierDashboardComponent } from './dashboard/carrier.dashboard.component'
import { CarrierUsersComponent } from './users/carrier.users.component';
import { CarrierGuard } from '../../Services/Guards/CarrierGuard';

const layoutRoutes: Routes = [
    {
        path: '',
        component: CarrierComponent,
        canActivate: [CarrierGuard],
        canActivateChild: [CarrierGuard],
        children: [
            {
                component: CarrierDashboardComponent,
                path: '',
            },
            {
                component: CarrierUsersComponent,
                path: 'users',
            }
        ],
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(
            layoutRoutes
        )
    ],
    exports: [
        RouterModule
    ]
})
export class CarrierRouting { }