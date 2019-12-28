import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AdminDashboardComponent } from './dashboard/admin.dashboard.component'
import { AdminUsersComponent } from './users/admin.users.component'
import { AdminOrdersComponent } from './orders/admin.orders.component'
import { AdminOrganisationsComponent } from './organisations/admin.organisations.component'
import { AdminGuard } from '../../Services/Guards/AdminGuard';

import { AdminComponent } from './admin.component';
import { AdminRoutesComponent } from './Routes/admin.routes.component';
import { RouteDetailsComponent } from '../Shared/Components/RouteDetails/route.details.component';
import { SettingsComponent } from '../Shared/Components/Settings/settings.component';

const adminRoutes: Routes = [

    {
        path: '',
        canActivateChild: [AdminGuard],
        children: [
            {
                path: 'users',
                component: AdminUsersComponent,
            },
            {
                path: 'organisations',
                component: AdminOrganisationsComponent,
            },
            {
                path: 'orders',
                component: AdminOrdersComponent,
            },
            {
                path: 'routes',
                component: AdminRoutesComponent,
            },
            {
                path: 'route/:id',
                component: RouteDetailsComponent
            },
            {
                path: 'settings',
                component: SettingsComponent
            },
            {
                path: '',
                component: AdminDashboardComponent,
            }
        ],
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(
            adminRoutes
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRouting { }