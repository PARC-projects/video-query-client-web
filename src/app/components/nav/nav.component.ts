import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  isCollapsed = false;
  apiUrl = environment.apiUrl;
  adminUrl = this.apiUrl + '/admin';
  currentPage = 'home';

  get firstName(): string {
    return this.authenticationService.getCurrentToken().first_name;
  }

  get firstNameInitial(): string {
    const firstName = this.firstName;
    if (firstName.length > 1) {
      return firstName.charAt(0);
    }
    return this.lastName;
  }

  get lastName(): string {
    return this.authenticationService.getCurrentToken().last_name;
  }

  get lastNameInitial(): string {
    const lastName = this.lastName;
    if (lastName.length > 1) {
      return lastName.charAt(0);
    }
    return this.lastName;
  }

  get initials(): string {
    return this.firstNameInitial + this.lastNameInitial;
  }

  constructor(public authenticationService: AuthenticationService,
    private router: Router) {
    this.currentPage = this.router.url;
    if (this.currentPage.charAt(0) === '/') {
      this.currentPage = this.currentPage.substring(1);
    }
    this.currentPage = this.currentPage.split('/')[0];
  }
}
