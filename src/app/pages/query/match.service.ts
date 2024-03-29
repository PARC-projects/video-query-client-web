import { Injectable } from '@angular/core';
import { Match } from '../../models/match.model';
import { MatchRepository } from '../../repositories/match.repository';
import { environment } from '../../../environments/environment';

@Injectable()
export class MatchService {
  matches: Match[];
  activeIndex: number;

  constructor(
    private matchRepository: MatchRepository
  ) { }

  async getMatches(queryId: number): Promise<void> {
    this.matches = await this.matchRepository.getLatestMatches(queryId)
      .toPromise();
    this.matches.forEach(match => {
      match.is_loading = true;
    });
  }

  submitRevision(queryId: number): Promise<Match> {
    return this.matchRepository.saveMatches(this.matches, queryId)
      .toPromise();
  }

  getFormattedVideoUrl(match: Match): string {
    if (match.reference_video_external_source) {
      return `${environment.externalSource.root}${match.match_video_path}#t=${match.reference_start_time},${match.reference_end_time}`;
    }

    return `${environment.fileStoreRoot}${match.match_video_path}#t=${match.reference_start_time},${match.reference_end_time}`;
  }

  /**
   * Set user validation state for derived match.
   * @param state Nullable boolean. If true user states this is a match.
   * If false use states this is not a match.  If null, user states they are undecided.
   */
  setValidation(match: Match): void {
    match.user_match = !match.user_match;
  }
}
