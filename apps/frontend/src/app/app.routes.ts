import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', redirectTo: 'users', pathMatch: 'full'
    },
    {
        path: 'users', 
        loadComponent: () => import('../app/pages/users-page/users-page.component').then(c => c.UsersPageComponent),
        // children:[
        //     {
        //         path: ':id', 
        //         loadComponent: () => import('../app/pages/todos/todos.component').then(c => c.TodosComponent)
        //     },
        // ]
    },
    {
        path: 'users/:id', 
        loadComponent: () => import('../app/pages/todos/todos.component').then(c => c.TodosComponent)
    },
    
    {
        path: '**', redirectTo: '', pathMatch: 'full'
    }
];
