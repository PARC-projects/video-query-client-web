import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NavComponent } from './nav.component';
import { AuthenticationService } from '../../services/authentication.service';
import { IToken } from '../../models/user.model';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let authService: AuthenticationService;
  let token: IToken;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavComponent],
      providers: [
        AuthenticationService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    authService = TestBed.get(AuthenticationService);

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('.logged-in-navigation should be hidden if not logged in.', () => {
    expect(authService.isLoggedIn()).toBe(false);

    const deAlert = fixture.debugElement.query(By.css('.logged-in-navigation'));

    expect(deAlert).toBeNull();
  });

  it('.logged-in-navigation should not be hidden if logged in.', () => {
    authService.setCurrentToken(token);
    expect(authService.isLoggedIn()).toBe(true);
    fixture.detectChanges();

    const deAlert = fixture.debugElement.query(By.css('.logged-in-navigation'));

    expect(deAlert).toBeTruthy();
  });

  it('.staff-navigation should be hidden if not staff.', () => {
    token.is_staff = false;
    authService.setCurrentToken(token);
    expect(authService.isLoggedIn()).toBe(true);
    expect(authService.getCurrentToken().is_staff).toBe(false);
    fixture.detectChanges();

    const deAlert = fixture.debugElement.query(By.css('.staff-navigation'));

    expect(deAlert).toBeNull();
  });

  it('.staff-navigation should not be hidden if logged in.', () => {
    token.is_staff = true;
    authService.setCurrentToken(token);
    expect(authService.isLoggedIn()).toBe(true);
    expect(authService.getCurrentToken().is_staff).toBe(true);
    fixture.detectChanges();

    const deAlert = fixture.debugElement.query(By.css('.staff-navigation'));

    expect(deAlert).toBeTruthy();
  });
});
