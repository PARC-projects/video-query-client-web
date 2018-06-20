import { Injectable } from '@angular/core';
import { QueryResultRepository } from '../../../../repositories/query-result.repository';
import { MatchRepository } from '../../../../repositories/match.repository';
import { IMatches } from '../../../../models/match.model';

@Injectable()
export class ResultsListChartService {
  queryResultId: number;
  matches: IMatches;

  constructor(
    private queryResultRepository: QueryResultRepository
  ) { }

  init(queryResultId: number): Promise<IMatches> {
    this.queryResultId = queryResultId;
    return this.queryResultRepository.getMatches(this.queryResultId)
      .toPromise()
      .then((resp: IMatches) => {
        this.matches = resp;
        return this.matches;
      });
  }
}
