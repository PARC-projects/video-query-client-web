import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Router } from '@angular/router';

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
    public homeService: HomeService
  ) { }

  ngOnInit() {
    this.homeService.init();
  }

  viewExistingQuery() {
    this.router.navigate(['existing-query']);
  }
}
