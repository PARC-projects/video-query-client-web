import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ModalComponent } from 'src/app/components/modal/modal.component';

@Component({
  selector: 'app-onboarding-modal',
  templateUrl: './onboarding-modal.component.html',
  styleUrls: ['./onboarding-modal.component.scss']
})
export class OnboardingModalComponent implements OnInit {
  @ViewChild(ModalComponent, { static: true }) private modalComponent: ModalComponent;

  public bypassChecked = true;
  public currentPage = 1;

  private dashboardUrl: string;

  constructor(private router: Router) { }

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

  onBypassChecked() {
    alert('as');
  }

  closeOnboarding() {
    this.modalComponent.close();
    this.router.navigate([this.dashboardUrl]);
  }
}
