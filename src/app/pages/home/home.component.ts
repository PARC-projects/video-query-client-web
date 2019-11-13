import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService, AlertType } from '../../services/alert.service';
import { ExistingQueryService } from './services/existing-query.service';
import { ExistingQueryMatchService } from './services/existing-query-match.service';
import { QueryRepository } from 'src/app/repositories/query.repository';
import { IQueryResponse, IQuery } from 'src/app/models/query.model';
import { IPagination } from 'src/app/models/pagination';

@Component({
  selector: 'app-existing-query-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    ExistingQueryService,
    ExistingQueryMatchService
  ]
})
export class HomeComponent implements OnInit {
  canvasLoading = false;

  queries = [] as IQuery[];
  pagination: IPagination;
  searchTerm: string;
  perPage = 10;

  private timeout: any;

  constructor(
    public existingQueryService: ExistingQueryService,
    public matchService: ExistingQueryMatchService,
    private alertService: AlertService,
    private queryRepository: QueryRepository
  ) { }

  onSearch(search: string): void {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.searchTerm = search;
    }, 500);
  }

  ngOnInit(): void {
    this.getQueries();
  }


  onPerPageSelection(perPageSelectedValue: number): void {
    this.perPage = perPageSelectedValue;
  }

  onPaginationClick(pageClicked: number): void {
  }

  private getQueries(page?: number): Promise<void> {
    return this.queryRepository.getAll(page, this.searchTerm, this.perPage)
      .toPromise()
      .then((resp: IQueryResponse) => {
        this.queries = resp.results;
        this.pagination = resp.pagination;
      })
      .catch(() => {
      });
  }

  /**
   * Emitter: app-query-header
   */
  onRevisionSubmit(): void {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    const message = `"${this.existingQueryService.currentQuery.name}": has been submitted for revision. Check back soon for results.`;
    this.canvasLoading = true;
    this.matchService.submitRevision(this.existingQueryService.currentQuery.id)
      .then(() => {
        return this.existingQueryService.updateQueryNote();
      })
      .then(() => {
        this.alertService.setAlert(message, AlertType.Success);
        this.canvasLoading = false;
      })
      .catch(() => {
        this.canvasLoading = false;
      });
  }


  /**
   * Emitter: app-query-header
   */
  onFinalizeSubmit(): void {
    if (confirm(`Are you sure you would like to send this query to be finalized?`)) {
      this.canvasLoading = true;
      this.matchService.submitRevision(this.existingQueryService.currentQuery.id)
        .then(() => {
          return this.existingQueryService.updateQueryStateToProcessFinalized();
        })
        .then(() => {
          const message = `"${this.existingQueryService.currentQuery.name}": has been submitted to be finalized`;
          this.alertService.setAlert(message, AlertType.Success);
          this.canvasLoading = false;
        })
        .catch(() => {
          this.canvasLoading = false;
        });
    }
  }
}
