import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'uView'
    },
    children: [
      {
        path: '',
        redirectTo: 'views',
        pathMatch: 'full'
      },
      {
        path: 'views',
        loadComponent: () => import('./view.component').then(m => m.ColorsComponent),
        data: {
          title: 'Views'
        }
      },
      
    ]
  }
];

