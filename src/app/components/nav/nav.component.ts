import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../services/authentication.service';

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
  constructor(public authenticationService: AuthenticationService) {
  }
}
