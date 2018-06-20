import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ILoginRequest, UserRepository } from '../../repositories/user.repository';
import { ActivatedRoute, Router } from '@angular/router';
import { IToken } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginRequest = {} as ILoginRequest;
  loading = false;
  returnUrl: string;
  errorMessage: string;

  constructor(
    private userRepository: UserRepository,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  onSubmitForm() {
    this.loading = true;
    this.errorMessage = null;
    this.userRepository.login({ username: this.loginRequest.username, password: this.loginRequest.password } as ILoginRequest)
      .subscribe((token: IToken) => {
        if (token && token.token) {
          this.authenticationService.setCurrentToken(token);
        }
        this.router.navigate([this.returnUrl]);
        this.loading = false;
      }, error => {
        // TODO: Parse django for a 404 on bad credentials
        if (error.status === 400) {
          this.errorMessage = error.error.non_field_errors[0];
        }
        if (error.status === 0) {
          this.errorMessage = 'The system is currently offline.  Please try again later.';
        }
        this.loading = false;
      });
  }
}
