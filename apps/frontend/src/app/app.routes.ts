import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', redirectTo: 'users', pathMatch: 'full'
    },
    {
        path: 'users', 
        loadComponent: () => import('../app/pages/users-page/users-page.component').then(c => c.UsersPageComponent)
    },
    {
        path: '**', redirectTo: '', pathMatch: 'full'
    }
];
