import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Input() widthByPercentage = '50%';
  @Input() blockOverlayClose = false;

  show = false;

  close(): void {
    this.show = false;
  }

  overlayClose(): void {
    if (!this.blockOverlayClose) {
      this.show = false;
    }
  }

  open(): void {
    this.show = true;
  }
}
