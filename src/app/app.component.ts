import { MenuHelper } from './helpers/menu.helper';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { Component } from '@angular/core';
import { RouteExtension } from './models/route-extension';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MenuHelper]
})
export class AppComponent {
  title = 'Store';
  constructor(private menu: MenuHelper) { }

  public getNavItems(): RouteExtension[] {
    return this.menu.navItems;
  }

  public getMenuItems(): RouteExtension[] {
    return this.menu.menuItems;
  }
}
