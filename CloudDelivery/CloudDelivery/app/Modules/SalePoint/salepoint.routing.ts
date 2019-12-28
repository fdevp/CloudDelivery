import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { SalepointComponent } from './salepoint.component'
import { SalepointDashboardComponent } from './dashboard/salepoint.dashboard.component'
import { SalepointOrdersComponent } from './orders/salepoint.orders.component';
import { SalepointGuard } from '../../Services/Guards/SalepointGuard';
import { SettingsComponent } from '../Shared/Components/Settings/settings.component';

const salepointRoutes: Routes = [
    {
        path: '',
        canActivateChild: [SalepointGuard],
        children: [
            {
                path: 'orders',
                component: SalepointOrdersComponent
            },
            {
                path: 'settings',
                component: SettingsComponent
            },
            {
                path: '',
                component: SalepointDashboardComponent
            }
        ],
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(
            salepointRoutes
        )
    ],
    exports: [
        RouterModule
    ]
})
export class SalepointRouting { }