import { Component, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-token-auth',
  templateUrl: './token-auth.component.html',
  styleUrls: ['./token-auth.component.scss']
})
export class TokenAuthComponent {

  @ViewChild(ModalComponent, { static: true }) private modalComponent: ModalComponent;

  environment = environment;

  // TODO: This will need to be dynamic in the case of multiple external sources being used.
  authToken = '';

  open(): void {
    this.modalComponent.open();
  }
}
