import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ResultsListChartService } from './results-list-chart.service';
import { IMatch } from '../../../../models/match.model';
import { ExistingQueryService } from '../../services/existing-query.service';
import { ExistingQueryMatchService } from '../../services/existing-query-match.service';

@Component({
  selector: 'app-results-list-chart',
  templateUrl: './results-list-chart.component.html',
  styleUrls: ['./results-list-chart.component.scss'],
  providers: [
    ResultsListChartService
  ]
})
export class ResultsListChartComponent {
  @Input() isEditable: boolean;
  @Input() activeMatch = {} as IMatch;
  @Output() matchClicked = new EventEmitter<IMatch>();

  constructor(
    public matchService: ExistingQueryMatchService,
    public existingQueryService: ExistingQueryService
  ) { }

  resetMatches() {
    if (confirm(`Are you sure you would like to reset all matches for this query?`)) {
      this.matchService.resetMatches();
    }
  }

  getMatchListClasses(match: IMatch) {
    const criterion = this.getMatchCriterion();
    return {
      'list-group-item-valid': match.score > criterion,
      'list-group-item-invalid': match.score < criterion,
      'list-group-item-null-user': match.user_match === null || match.user_match === undefined,
      'list-group-item-invalid-user': match.user_match === false,
      'list-group-item-valid-user': match.user_match,
      'active': this.matchService.getActiveMatch() ? this.matchService.getActiveMatch().id === match.id : null
    };
  }

  getMatchProgressStyles(match: IMatch) {
    return {
      width: 100 * match.score / this.matchService.matches[0].score + '%'
    };
  }

  getMatchProgressClasses(match: IMatch) {
    const criterion = this.getMatchCriterion();
    return {
      'valid': match.score > criterion,
      'invalid': match.score < criterion
    };
  }

  getMatchThresholdStyles() {
    const criterion = this.getMatchCriterion();
    return {
      marginLeft: 100 * criterion / this.matchService.matches[0].score + '%'
    };
  }

  onMatchClick(match?: IMatch) {
    this.matchService.setActiveMatch(match);
  }

  private getMatchCriterion() {
    return this.existingQueryService.currentQuery.query_result ?
      this.existingQueryService.currentQuery.query_result.match_criterion :
      0;
  }
}
