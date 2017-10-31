import {
  APP_ROUTE_PRODUCTS,
  APP_ROUTE_PROFILE,
  APP_ROUTE_LOGIN,
  APP_ROUTE_ABOUT
} from './constants';
import { RouteExtension } from '../models/route-extension';

export class MenuHelper {
  // nav items
  public navItems: RouteExtension[] = [{
    path: APP_ROUTE_PRODUCTS,
    icon: 'shopping_basket',
    title: 'Products'
  }, {
    path: APP_ROUTE_ABOUT,
    icon: 'help_outline',
    title: 'Help'
  }];

  // menu items
  public menuItems: RouteExtension[] = [{
    path: APP_ROUTE_PROFILE,
    icon: 'portrait',
    title: 'Profile'
  },
  {
    path: APP_ROUTE_LOGIN,
    icon: 'exit_to_app',
    title: 'Sign'
  }];
}
