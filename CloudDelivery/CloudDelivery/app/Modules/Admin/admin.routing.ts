import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AdminComponent } from './admin.component'
import { AdminDashboardComponent } from './dashboard/admin.dashboard.component'
import { AdminUsersComponent } from './users/admin.users.component'
import { AdminGuard } from '../../Services/Guards/AdminGuard';

const layoutRoutes: Routes = [

    {
        path: '',
        component: AdminComponent,
        canActivate: [AdminGuard],
        canActivateChild: [AdminGuard],
        children: [
            {
                path: '',
                component: AdminDashboardComponent,
            },
            {
                path: 'users',
                component: AdminUsersComponent,
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
export class AdminRouting { }