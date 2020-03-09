import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Input() widthByPercentage = '50%';
  @Input() blockOverlayClose = false;
  @Input() show = false;
  @Output() showChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  close(): void {
    this.show = false;
    this.showChange.emit(this.show);
  }

  overlayClose(): void {
    if (!this.blockOverlayClose) {
      this.show = false;
      this.showChange.emit(this.show);
    }
  }

  open(): void {
    this.show = true;
    this.showChange.emit(this.show);
  }
}
