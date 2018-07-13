import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  show = false;

  close(): void {
    this.show = false;
  }

  open(): void {
    this.show = true;
  }
}
