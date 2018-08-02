import { Injectable } from '@angular/core';
import { IToken } from '../models/user.model';

@Injectable()
export class AuthenticationService {

  constructor() { }

  setCurrentToken(token: IToken): void {
    localStorage.setItem('token', JSON.stringify(token));
  }

  getCurrentToken(): IToken {
    return JSON.parse(localStorage.getItem('token'));
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') != null;
  }

  logout() {
    localStorage.removeItem('token');
  }
}
