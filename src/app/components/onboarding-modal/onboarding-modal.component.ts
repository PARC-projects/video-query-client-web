import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalComponent } from 'src/app/components/modal/modal.component';

@Component({
  selector: 'app-onboarding-modal',
  templateUrl: './onboarding-modal.component.html',
  styleUrls: ['./onboarding-modal.component.scss']
})
export class OnboardingModalComponent implements OnInit {

  public currentPage = 1;

  @ViewChild(ModalComponent, { static: true }) private modalComponent: ModalComponent;

  ngOnInit() {
    this.modalComponent.open();
  }

  nextPage() {
    this.currentPage++;
  }

  closeOnboarding() {
    this.modalComponent.close();
  }
}
