import { environment } from './../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Injectable, Injector } from '@angular/core';
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
import { AuthenticationService } from './auth.service';
import { HTTP_AUTHORIZATION, HTTP_AUTH_BEARER } from '../helpers/constants';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    const auth = this.injector.get(AuthenticationService);

    const authToken = auth.getToken();
    const url = environment.api;

    request = request.clone({
      url: `${url}${request.url}`,
      headers: request.headers.set(HTTP_AUTHORIZATION, `${HTTP_AUTH_BEARER} ${authToken}`),
    });

    return next.handle(request);
  }
}
