import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ModalComponent } from 'src/app/components/modal/modal.component';
import { ProfileRepository } from 'src/app/repositories/profile.repository';
import { Profile } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-onboarding-modal',
  templateUrl: './onboarding-modal.component.html',
  styleUrls: ['./onboarding-modal.component.scss']
})
export class OnboardingModalComponent implements OnInit {
  @ViewChild(ModalComponent, { static: true }) private modalComponent: ModalComponent;

  public bypassChecked = false;
  public currentPage = 1;

  private dashboardUrl: string;

  constructor(private router: Router,
    private authService: AuthenticationService,
    private profileRepository: ProfileRepository) { }

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
    const profile = new Profile();
    profile.id = this.authService.getCurrentToken().profile_id;
    profile.bypass_onboarding = this.bypassChecked;
    this.profileRepository.patch(profile)
      .toPromise()
      .then((resp: Profile) => {
        const token = this.authService.getCurrentToken();
        token.bypass_onboarding = resp.bypass_onboarding;
        this.authService.setCurrentToken(token);
      });
  }

  closeOnboarding() {
    this.modalComponent.close();
    this.router.navigate([this.dashboardUrl]);
  }
}
