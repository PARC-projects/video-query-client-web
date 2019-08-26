import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ChartOneComponent } from './charts/chart-one/chart-one.component';
import { ChartTwoComponent } from './charts/chart-two/chart-two.component';
import { AlertService, AlertType } from '../../services/alert.service';
import { ExistingQueryService } from './services/existing-query.service';
import { ExistingQueryMatchService } from './services/existing-query-match.service';

const CONFIRM_QUERY_CHART = environment.confirmQueryChart;

@Component({
  selector: 'app-existing-query-page',
  templateUrl: './existing-query.component.html',
  styleUrls: ['./existing-query.component.scss'],
  providers: [
    ExistingQueryService,
    ExistingQueryMatchService
  ]
})
export class ExistingQueryComponent implements OnInit {
  canvasLoading = false;
  chartVersion = CONFIRM_QUERY_CHART;
  disabled = false;

  @ViewChild(ChartOneComponent, { static: false }) private chartOne: ChartOneComponent;
  @ViewChild(ChartTwoComponent, { static: false }) private chartTwo: ChartTwoComponent;

  private sub: Subscription;

  constructor(
    public existingQueryService: ExistingQueryService,
    public matchService: ExistingQueryMatchService,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.sub = this.activatedRoute.queryParamMap
      .subscribe((paramMap: any) => {
        // TODO: Strongly-type ^
        if (paramMap.params['chartVersion']) {
          this.chartVersion = parseInt(paramMap.params['chartVersion'], 10);
        }
      });
  }

  /**
   * Emitter: app-query-selection
   */
  onQueryClick(clickedQueryId: number): void {
    this.canvasLoading = true;
    this.matchService.getMatches(clickedQueryId)
      .then(() => {
        return this.existingQueryService.getCurrentQuery(clickedQueryId);
      })
      .then(() => {
        this.buildChart(this.chartVersion);
        this.canvasLoading = false;
        this.disabled = false;
      })
      .catch(() => {
        this.canvasLoading = false;
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
        this.disabled = true;
      })
      .catch(() => {
        this.canvasLoading = false;
      });
  }

  /**
   * Emitter: app-query-header
   */
  onResetQuery(): void {
    const name = this.existingQueryService.currentQuery.name;
    if (confirm(`Are you sure you would like to reset the state of "${name}" to when it was loaded?`)) {
      this.onQueryClick(this.existingQueryService.currentQuery.id);
      this.buildChart(this.chartVersion);
    }
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

  /**
   * Emitter: app-results-list-chart
   */
  onResetCurrentActiveMatch() {
    this.matchService.resetCurrentActiveMatch();
    this.buildChart(this.chartVersion);
  }

  isQueryDisabled(): boolean {
    return this.existingQueryService.currentQuery.process_state !== 4;
  }

  isProcessing(): boolean {
    return (this.existingQueryService.currentQuery.process_state === 1
      || this.existingQueryService.currentQuery.process_state === 2
      || this.existingQueryService.currentQuery.process_state === 3)
      && !this.canvasLoading;
  }

  private buildChart(chartVersion: number) {
    if (this.isQueryDisabled()) {
      return;
    }
    this.chartVersion = chartVersion;
    switch (this.chartVersion) {
      case 1:
        this.chartOne.buildChart();
        break;
      case 2:
        this.chartTwo.buildChart();
        break;
    }
  }
}
