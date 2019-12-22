import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ModalComponent } from 'src/app/components/modal/modal.component';
import {UserRepository} from '../../repositories/user.repository';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-onboarding-modal',
  templateUrl: './onboarding-modal.component.html',
  styleUrls: ['./onboarding-modal.component.scss']
})
export class OnboardingModalComponent implements OnInit {

  public currentPage = 1;
  dashboardUrl: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  @ViewChild(ModalComponent, { static: true }) private modalComponent: ModalComponent;

  ngOnInit() {
    this.modalComponent.open();
    // get dashboard url from route parameters or default to '/'
    this.dashboardUrl = '/home';
  }

  nextPage() {
    this.currentPage++;
  }

  backPage() {
    this.currentPage--;
  }

  closeOnboarding() {
    this.modalComponent.close();
    this.router.navigate([this.dashboardUrl]);
  }
}
