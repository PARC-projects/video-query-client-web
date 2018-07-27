import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { IQueryResponse, IQuery } from '../../../../models/query.model';
import { QueryRepository } from '../../../../repositories/query.repository';
import { IListNavConfig } from '../../../../components/list-nav/list-nav.component';

@Component({
  selector: 'app-query-selection',
  templateUrl: './query-selection.component.html',
  styleUrls: ['./query-selection.component.scss']
})
export class QuerySelectionComponent implements OnInit {
  @Output() queryClick: EventEmitter<number> = new EventEmitter();

  currentQueryId: number;
  loading = false;
  searchTerm: string;
  perPage = 10;
  listNavConfig: IListNavConfig;

  private timeout: any;

  constructor(
    private queryRepository: QueryRepository
  ) { }

  ngOnInit() {
    this.getQueries();
  }

  onPaginationClick(pageNumber: number): void {
    this.getQueries(pageNumber);
  }

  onPerPageSelection(perPageSelectedValue: number): void {
    this.perPage = perPageSelectedValue;
    this.getQueries(1);
  }

  onSearch(search: string): void {
    const self = this;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.searchTerm = search;
      this.getQueries(1);
    }, 500);
  }

  onSelected(id: number): void {
    this.currentQueryId = id;
    this.queryClick.emit(this.currentQueryId);
  }

  private getQueries(page?: number): Promise<void> {
    this.loading = true;
    return this.queryRepository.getAll(page, this.searchTerm, this.perPage)
      .toPromise()
      .then((resp: IQueryResponse) => {
        this.listNavConfig = {
          data: resp.results,
          title: 'Queries',
          tooltip: 'Select a query to review.',
          displayPropertyName: 'name',
          pagination: resp.pagination
        } as IListNavConfig;
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
      });
  }
}
