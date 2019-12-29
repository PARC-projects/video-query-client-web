import { Component, ViewChild, EventEmitter, Output } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ModalComponent } from '../modal/modal.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { throwError, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-token-auth',
  templateUrl: './token-auth.component.html',
  styleUrls: ['./token-auth.component.scss']
})
export class TokenAuthComponent {

  @ViewChild(ModalComponent, { static: true }) private modalComponent: ModalComponent;
  @Output() submit: EventEmitter<void> = new EventEmitter();

  environment = environment;

  // TODO: This will need to be dynamic in the case of multiple external sources being used.
  authToken = '';

  constructor(public authenticationService: AuthenticationService,
    private http: HttpClient) {
  }

  open(): void {
    this.modalComponent.open();
  }

  async onAuthSubmit(): Promise<void> {
    const result = await this.authenticate()
      .toPromise();

    this.modalComponent.close();

    if (result) {
      this.submit.emit();
      return;
    }

    alert('Invalid Token provided');
  }


  authenticate(): Observable<boolean> {
    if (environment.externalSource.authentication.developmentToken) {
      if (environment.externalSource.authentication.developmentToken === this.authToken) {
        this.authenticationService.setCurrentExternalToken(this.authToken);
        return of<boolean>(true);
      }
      this.authenticationService.removeCurrentExternalToken();
      return of<boolean>(false);
    }

    // TODO: Call endpoint
    this.authenticationService.removeCurrentExternalToken();
    return of<boolean>(false);
  }

  private handleError(error: Response | any) {
    console.error('TokenAuthComponent::handleError', error);
    return throwError(error);
  }
}
