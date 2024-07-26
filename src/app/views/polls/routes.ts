import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Polls'
    },
    children: [
      {
        path: '',
        redirectTo: 'polls',
        pathMatch: 'full'
      },
      {
        path: 'polls',
        loadComponent: () => import('./polls.component').then(m => m.ColorsComponent),
        data: {
          title: 'Polls'
        }
      },
      
    ]
  }
];

