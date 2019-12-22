import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Input() widthByPercentage = '50%';

  show = false;

  close(): void {
    this.show = false;
  }

  open(): void {
    this.show = true;
  }
}
