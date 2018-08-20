import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { IToken } from '../models/user.model';

export interface ILoginRequest {
  username: string;
  password: string;
}

@Injectable()
export class UserRepository {

  constructor(private http: HttpClient) { }

  login(loginModel: ILoginRequest): Observable<IToken> {
    return this.http.post(`${environment.apiUrl}/api-token-auth/`, loginModel).pipe(
      map((resp: IToken) => {
        return resp || {} as IToken;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: Response | any) {
    console.error('UserRepository::handleError', error);
    return throwError(error);
  }
}
