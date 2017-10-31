import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductListComponent } from './components/product-list/product-list.component';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AboutComponent } from './components/about/about.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  APP_ROUTE_HOME,
  APP_UNAUTHORIZED,
  APP_ROUTE_PRODUCTS,
  APP_ROUTE_PRODUCT,
  APP_ROUTE_PRODUCT_ID,
  APP_ROUTE_LOGIN,
  APP_ROUTE_REGISTER,
  APP_ROUTE_FORGOT_PASSWORD,
  APP_ROUTE_ABOUT,
  APP_ROUTE_PROFILE,
  PATH_MATH_FULL,
  PAGE_NOT_FOUND
} from './helpers/constants';

const routes: Routes = [
  {
    path: '',
    redirectTo: APP_ROUTE_HOME,
    pathMatch: PATH_MATH_FULL
  },
  {
    path: APP_ROUTE_HOME,
    component: HomeComponent
  },
  {
    path: APP_UNAUTHORIZED,
    component: UnauthorizedComponent
  },
  {
    path: APP_ROUTE_PRODUCTS,
    component: ProductListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: APP_ROUTE_PRODUCT_ID,
    component: ProductDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: APP_ROUTE_PRODUCT,
    component: ProductDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: APP_ROUTE_LOGIN,
    component: LoginComponent
  },
  {
    path: APP_ROUTE_REGISTER,
    component: RegisterComponent
  },
  {
    path: APP_ROUTE_FORGOT_PASSWORD,
    component: ForgotPasswordComponent
  },
  {
    path: APP_ROUTE_ABOUT,
    component: AboutComponent
  },
  {
    path: APP_ROUTE_PROFILE,
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: PAGE_NOT_FOUND,
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      enableTracing: true
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
