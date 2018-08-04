import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IPagination } from '../../models/pagination';

export interface IListNavConfig {
  data: any;
  title: string;
  tooltip: string;
  displayPropertyName: string;
  pagination: IPagination;
}

@Component({
  selector: 'app-list-nav',
  templateUrl: './list-nav.component.html',
  styleUrls: ['./list-nav.component.scss']
})
export class ListNavComponent {
  @Input() config: IListNavConfig;
  @Output() selected: EventEmitter<number> = new EventEmitter();
  @Output() perPageSelection: EventEmitter<number> = new EventEmitter();
  @Output() paginationClick: EventEmitter<number> = new EventEmitter();
  @Output() search: EventEmitter<string> = new EventEmitter();

  currentId: number;
  loading = false;
  searchTerm: string;
  perPage = 10;
  private timeout: any;

  onPerPageSelection(perPageSelectedValue: number): void {
    this.perPage = perPageSelectedValue;
    this.perPageSelection.emit(this.perPage);
  }

  onPaginationClick(pageClicked: number): void {
    this.paginationClick.emit(pageClicked);
  }

  onSearch(search: string): void {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.searchTerm = search;
      this.search.emit(this.searchTerm);
    }, 500);
  }

  onClick(id: number): void {
    this.currentId = id;
    this.selected.emit(this.currentId);
  }
}
