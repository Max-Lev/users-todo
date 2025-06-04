import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', redirectTo: 'users', pathMatch: 'full'
    },
    {
        path: 'users',
        loadComponent: () => import('../app/pages/users-page/users-page.component').then(c => c.UsersPageComponent),
    },
    {
        path: 'users/:id',
        loadComponent: () =>
            import('../app/pages/edit-user-page/edit-user-page.component').then(c => c.EditUserPageComponent),
    },

    {
        path: '**', redirectTo: '', pathMatch: 'full'
    }
];
