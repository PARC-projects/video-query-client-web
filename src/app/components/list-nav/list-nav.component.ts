import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

export interface IListNavConfig {
  data: any;
  title: string;
  tooltip: string;
  displayPropertyName: string;
}

@Component({
  selector: 'app-list-nav',
  templateUrl: './list-nav.component.html',
  styleUrls: ['./list-nav.component.scss']
})
export class ListNavComponent implements OnInit {
  @Input() config: IListNavConfig;

  @Output() click: EventEmitter<number> = new EventEmitter();
  @Output() perPageSelection: EventEmitter<number> = new EventEmitter();
  @Output() search: EventEmitter<string> = new EventEmitter();

  currentId: number;
  loading = false;
  searchTerm: string;
  perPage = 10;
  private timeout: any;

  constructor() { }

  ngOnInit() {
  }

  onPerPageSelection(perPageSelectedValue: number): void {
    this.perPage = perPageSelectedValue;
    this.perPageSelection.emit(this.perPage);
  }

  onSearch(search: string): void {
    const self = this;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.searchTerm = search;
      this.search.emit(this.searchTerm);
    }, 500);
  }

  onClick(id: number): void {
    this.currentId = id;
    this.click.emit(this.currentId);
  }
}
