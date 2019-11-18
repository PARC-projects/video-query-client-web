import { Injectable } from '@angular/core';
import { IMatch, IMatchView } from '../../../models/match.model';
import { QueryRepository } from '../../../repositories/query.repository';
import { MatchRepository } from '../../../repositories/match.repository';
import { environment } from '../../../../environments/environment';

@Injectable()
export class QueryMatchService {
  matches: IMatchView[];
  activeIndex: number;

  constructor(
    private matchRepository: MatchRepository,
    private queryRepository: QueryRepository
  ) { }

  async getMatches(queryId: number): Promise<void> {
    const resp = await this.queryRepository.getLatestMatches(queryId)
      .toPromise();
    this.matches = (resp as IMatchView[]);
    this.matches.forEach(match => {
      match.is_loading = true;
    });
  }

  submitRevision(queryId: number): Promise<IMatch> {
    return this.matchRepository.saveMatches(this.matches, queryId)
      .toPromise();
  }

  getFormattedVideoUrl(match: IMatch): string {
    if (match.reference_video_external_source) {
      return `${environment.externalSource.root}${match.match_video_path}#t=${match.reference_start_time}`;
    }

    return `${environment.fileStoreRoot}${match.match_video_path}#t=${match.reference_start_time}`;
  }

  /**
   * Set user validation state for derived match.
   * @param state Nullable boolean. If true user states this is a match.
   * If false use states this is not a match.  If null, user states they are undecided.
   */
  setValidation(match: IMatch): void {
    match.user_match = !match.user_match;
  }
}
