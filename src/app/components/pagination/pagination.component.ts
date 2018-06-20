import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IPagination } from '../../models/pagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() pagination: IPagination;
  @Output() paginationClick: EventEmitter<number> = new EventEmitter();
  @Output() perPageSelected: EventEmitter<number> = new EventEmitter();
  perPage = 10;

  onPaginationClick(page: number) {
    this.paginationClick.emit(page);
  }
  onPerPageSelected() {
    this.perPageSelected.emit(this.perPage);
  }
}
