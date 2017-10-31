import { NotificationService } from './notification.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {
  HttpSentEvent,
  HttpClient,
  HttpHeaderResponse,
  HttpInterceptor,
  HttpProgressEvent,
  HttpResponse,
  HttpUserEvent,
  HttpRequest,
  HttpHandler
} from '@angular/common/http';
import { Token } from '../models/token';
import { JwtHelper } from 'angular2-jwt';
import {
  API_AUTH_LOGIN,
  API_AUTH_LOGOUT,
  CUR_USR_LS_KEY,
  APP_ROUTE_PRODUCTS
} from '../helpers/constants';

@Injectable()
export class AuthenticationService {
  private jwtHelper = new JwtHelper();
  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private notification: NotificationService) { }

  public login(email: string, password: string): void {
    this.httpClient.post<Token>(API_AUTH_LOGIN, { email: email, password: password })
      .subscribe(
      data => {
        localStorage.setItem(CUR_USR_LS_KEY, JSON.stringify({ user: data.user, token: data.token }));
        this.router.navigate([APP_ROUTE_PRODUCTS]);
      },
      error => {
        this.notification.notify(error.message);
        console.error(error);
      });
  }

  public logout(): void {
    this.httpClient.get(API_AUTH_LOGOUT).subscribe(
      data => {
        localStorage.removeItem(CUR_USR_LS_KEY);
      },
      error => {
        this.notification.notify(error.message);
        console.error(error);
      });
  }

  public getToken(): string {
    const currentUser = localStorage.getItem(CUR_USR_LS_KEY);
    if (currentUser) {
      return JSON.parse(currentUser).token;
    }

    return null;
  }

  public isAuthenticated(): boolean {
    return this.isTokenNotExpired();
  }

  private isTokenNotExpired(): boolean {
    const token = this.getToken();
    if (token) {
      return !this.jwtHelper.isTokenExpired(token);
    }

    return false;
  }
}
