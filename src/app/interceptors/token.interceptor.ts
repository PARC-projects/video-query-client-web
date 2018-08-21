import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentToken = this.auth.getCurrentToken();
    if (currentToken && currentToken.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Token ${currentToken.token}`
        }
      });
    }
    return next.handle(request);
  }
}
