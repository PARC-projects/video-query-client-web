import { NgModule } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { AlertService } from './alert.service';

@NgModule({
  providers: [
    AuthenticationService,
    AlertService
  ]
})
export class ServiceModule { }
