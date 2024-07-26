import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Manage Users'
    },
    children: [
      {
        path: '',
        redirectTo: 'manage-users',
        pathMatch: 'full'
      },
      {
        path: 'manage-users',
        loadComponent: () => import('./manage-users.component').then(m => m.ColorsComponent),
        data: {
          title: 'Manage Users'
        }
      },
      
    ]
  }
];

