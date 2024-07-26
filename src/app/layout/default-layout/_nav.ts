import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Menu',
    title: true
  },
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    
  },
  
  {
    name: 'Views',
    url: '/views',
    iconComponent: { name: 'cil-drop' }
  },
  {
    name: 'Incidences',
    url: '/incidences',
    linkProps: { fragment: 'headings' },
    iconComponent: { name: 'cil-pencil' }
  },
  {
    name: 'Polls',
    iconComponent: { name: 'cil-chart-pie' },
    url: '/polls'
  },
  {
    name: 'Manage Users',
    iconComponent: { name: 'cil-user' },
    url: '/manage-users'
  },
  {
    name: 'Pages',
    url: '/login',
    iconComponent: { name: 'cil-star' },
    children: [
      {
        name: 'Home',
        url: '/home',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Login',
        url: '/login',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Register',
        url: '/register',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Forgot Password',
        url: '/forgot-password',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Reset Password',
        url: '/reset-password',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Error 404',
        url: '/404',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Error 500',
        url: '/500',
        icon: 'nav-icon-bullet'
      }
    ]
  },
];
