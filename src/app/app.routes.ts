import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/routes').then((m) => m.routes)
      },
      {
        path: 'views',
        loadChildren: () => import('./views/uView/routes').then((m) => m.routes)
      },
      {
        path: 'incidences',
        loadChildren: () => import('./views/incidences/routes').then((m) => m.routes)
      },
      {
        path: 'polls',
        loadChildren: () => import('./views/polls/routes').then((m) => m.routes)
      },
      {
        path: 'manage-users',
        loadChildren: () => import('./views/manage-users/routes').then((m) => m.routes)
      },
      
      {
        path: 'pages',
        loadChildren: () => import('./views/pages/routes').then((m) => m.routes)
      }
    ]
  },
  {
    path: '404',
    loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component),
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component),
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'home',
    loadComponent: () => import('./views/pages/homePage/homePage.component').then(m => m.homePageComponent),
    data: {
      title: 'Home Page'
    }
  },
  {
    path: 'login',
    loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    loadComponent: () => import('./views/pages/register/register.component').then(m => m.RegisterComponent),
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./views/pages/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent),
    data: {
      title: 'Forgot Password Page'
    }
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./views/pages/reset-password/reset-password.component').then(m => m.resetpasswordComponent),
    data: {
      title: 'Reset Password Page'
    }
  },
  { path: '**', redirectTo: 'dashboard' }
];
