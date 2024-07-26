import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'incidences'
    },
    children: [
      {
        path: '',
        redirectTo: 'incidences',
        pathMatch: 'full'
      },
      {
        path: 'incidences',
        loadComponent: () => import('./incidences.component').then(m => m.ColorsComponent),
        data: {
          title: 'incidences'
        }
      },
      
    ]
  }
];

