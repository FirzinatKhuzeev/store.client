import { HttpClient } from '@angular/common/http';
import { User } from './../models/user';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import {
  CUR_USR_LS_KEY,
  API_USER_CREATE,
  API_USER_FORGOT,
  API_USER
} from '../helpers/constants';

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getCurrentUser(): User {
    const data = JSON.parse(localStorage.getItem(CUR_USR_LS_KEY));
    return <User>data.user;
  }

  create(user: User): Observable<User> {
    return this.httpClient.post<User>(API_USER_CREATE, user);
  }

  update(user: User): Observable<User> {
    return this.httpClient.put<User>(`${API_USER}${user.id}`, user);
  }

  forgotPassword(email: string): Observable<boolean> {
    return this.httpClient.put<boolean>(API_USER_FORGOT, email);
  }
}
