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

  constructor(public authenticationService: AuthenticationService,
    private router: Router) {
    this.currentPage = this.router.url;
    if (this.currentPage.charAt(0) === '/') {
      this.currentPage = this.currentPage.substring(1);
    }
    this.currentPage = this.currentPage.split('/')[0];
  }
}
