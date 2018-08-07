import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  mailToAddress = environment.mailToAddress;
  apiUrl = environment.apiUrl;
  adminUrl = this.apiUrl + '/admin';

  constructor(public authenticationService: AuthenticationService) {
  }
}
