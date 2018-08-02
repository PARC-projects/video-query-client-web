import { TestBed, inject } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { IToken } from '../models/user.model';

describe('AuthenticationService', () => {

  let authenticationService: AuthenticationService;
  let token: IToken;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationService]
    });

    authenticationService = TestBed.get(AuthenticationService);

    let store = {};

    const mockLocalStorage = {
      getItem: (key: string): IToken => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };

    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);

    token = {
      token: 'abc',
      is_staff: false
    } as IToken;
  });

  it('should be created', inject([AuthenticationService], (service: AuthenticationService) => {
    expect(service).toBeTruthy();
  }));

  describe('setCurrentToken', () => {
    it('should store the token in localStorage', () => {
      authenticationService.setCurrentToken(token);

      expect(localStorage.getItem('token')).toEqual(JSON.stringify(token));
    });
  });

  describe('getCurrentToken', () => {
    it('should return stored token from localStorage', () => {
      authenticationService.setCurrentToken(token);

      expect(authenticationService.getCurrentToken()).toEqual(token);
    });
  });

  describe('isLoggedIn', () => {
    it('should return false if not token is set', () => {
      expect(authenticationService.isLoggedIn()).toEqual(false);
    });

    it('should return true if token is set', () => {
      authenticationService.setCurrentToken(token);

      expect(authenticationService.isLoggedIn()).toEqual(true);
    });
  });

  describe('logout', () => {
    it('should remove token', () => {
      authenticationService.setCurrentToken(token);

      authenticationService.logout();

      expect(authenticationService.isLoggedIn()).toEqual(false);
    });
  });
});
