import { Component,  Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chart-header',
  templateUrl: './chart-header.component.html',
  styleUrls: ['./chart-header.component.scss']
})
export class ChartHeaderComponent {
  @Input() title: string;
  @Input() tooltip: string;
  @Input() disableRefresh = false;
  @Output() resetClick: EventEmitter<void> = new EventEmitter();

  constructor() { }

  onReset(): void {
    this.resetClick.emit();
  }
}
