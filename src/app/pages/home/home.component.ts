import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HomeService } from './home.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    HomeService
  ]
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    public homeService: HomeService,
    public authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.homeService.init();
  }

  viewExistingQuery() {
    this.router.navigate(['existing-query']);
  }
}
