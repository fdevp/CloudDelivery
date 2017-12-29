import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AdminDashboardComponent } from './dashboard/admin.dashboard.component'
import { AdminUsersComponent } from './users/admin.users.component'
import { AdminOrganisationsComponent } from './organisations/admin.organisations.component'
import { AdminGuard } from '../../Services/Guards/AdminGuard';

import { AdminComponent } from './admin.component';

const adminRoutes: Routes = [

    {
        path: '',
        canActivateChild: [AdminGuard],
        component: AdminComponent,
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