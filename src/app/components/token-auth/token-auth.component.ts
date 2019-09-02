import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-token-auth',
  templateUrl: './token-auth.component.html',
  styleUrls: ['./token-auth.component.scss']
})
export class TokenAuthComponent {
  environment = environment;

  // TODO: This will need to be dynamic in the case of multiple external sources being used.
  authToken = '';
}
