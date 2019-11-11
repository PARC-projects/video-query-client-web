import { NgModule } from '@angular/core';

import { AlertComponent } from './alert/alert.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ListNavComponent } from './list-nav/list-nav.component';
import { LoaderComponent } from './loader/loader.component';
import { ModalComponent } from './modal/modal.component';
import { NavComponent } from './nav/nav.component';
import { BrowserModule } from '@angular/platform-browser';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination/pagination.component';
import { RouterModule } from '@angular/router';
import { TokenAuthComponent } from './token-auth/token-auth.component';
import { OnboardingModalComponent } from './onboarding-modal/onboarding-modal.component';

@NgModule({
  declarations: [
    AlertComponent,
    FooterComponent,
    HeaderComponent,
    ListNavComponent,
    LoaderComponent,
    ModalComponent,
    NavComponent,
    PaginationComponent,
    TokenAuthComponent,
    OnboardingModalComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    RouterModule,
    MatTooltipModule,
    BrowserAnimationsModule
  ],
  exports: [
    AlertComponent,
    FooterComponent,
    HeaderComponent,
    ListNavComponent,
    LoaderComponent,
    ModalComponent,
    NavComponent,
    PaginationComponent,
    TokenAuthComponent,
    OnboardingModalComponent
  ]
})
export class ComponentsModule { }
