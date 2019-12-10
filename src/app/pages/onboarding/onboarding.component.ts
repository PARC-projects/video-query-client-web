import { Component, OnInit } from '@angular/core';
import { QueryRepository } from 'src/app/repositories/query.repository';
import { IQuery } from 'src/app/models/query.model';
import { IPagination } from 'src/app/models/pagination';

@Component({
  selector: 'app-existing-query-page',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss'],
})
export class OnboardingComponent implements OnInit {
  isLoading = false;
  queries = [] as IQuery[];
  pagination: IPagination;
  searchTerm: string;

  private timeout: any;

  constructor(
    private queryRepository: QueryRepository
  ) { }

  ngOnInit(): void {
    this.getQueries();
  }

  onSearch(search: string): void {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.searchTerm = search;
      this.getQueries(1);
    }, 500);
  }

  onPerPageSelection(perPageSelectedValue: number): void {
    this.getQueries(this.pagination.currentPage, perPageSelectedValue);
  }

  onPaginationClick(pageClicked: number): void {
    this.getQueries(pageClicked);
  }

  private async getQueries(page?: number, perPage = 10): Promise<void> {
    this.isLoading = true;

    const resp = await this.queryRepository.getAll(page, this.searchTerm, perPage)
      .toPromise();

    this.queries = resp.results;
    this.pagination = resp.pagination;
    this.isLoading = false;
  }
}
