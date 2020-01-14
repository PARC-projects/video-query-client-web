import { Component, ViewChild, EventEmitter, Output } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ModalComponent } from '../modal/modal.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { throwError, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-token-auth',
  templateUrl: './token-auth.component.html',
  styleUrls: ['./token-auth.component.scss']
})
export class TokenAuthComponent {

  @ViewChild(ModalComponent, { static: true }) private modalComponent: ModalComponent;
  @Output() authSubmitted = new EventEmitter<boolean>();

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
      this.authSubmitted.emit(result);
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
    return this.validateToken();
  }

  validateToken(): Observable<boolean> {
    const headers = new HttpHeaders().set(environment.externalSource.authentication.header.name, this.authToken);
    return this.http.get(environment.externalSource.authentication.authEndpoint, { headers }).pipe(
      map(() => {
        this.authenticationService.setCurrentExternalToken(this.authToken);
        return true;
      }),
      catchError(err => {
        // This manages 401 and CORS
        this.handleError(err);
        return of<boolean>(false);
      })
    );
  }

  private handleError(error: Response | any) {
    console.error('TokenAuthComponent::handleError', error);
    return throwError(error);
  }
}
