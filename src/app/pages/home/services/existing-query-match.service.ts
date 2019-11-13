import { Injectable, EventEmitter } from '@angular/core';
import { IMatchView, IMatch } from '../../../models/match.model';
import { QueryRepository } from '../../../repositories/query.repository';
import { MatchRepository } from '../../../repositories/match.repository';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ExistingQueryMatchService {
  validationClicked: EventEmitter<boolean> = new EventEmitter();
  matchClicked: EventEmitter<IMatchView> = new EventEmitter();
  matches: IMatchView[];
  matchCache: IMatchView[];
  activeIndex: number;
  videoSrc: string;

  constructor(
    private matchRepository: MatchRepository,
    private queryRepository: QueryRepository
  ) { }

  getMatches(queryId: number): Promise<void> {
    return this.queryRepository.getLatestMatches(queryId)
      .toPromise()
      .then((resp: IMatch[]) => {
        this.videoSrc = null;
        this.matches = resp as IMatchView[];
        this.matchCache = JSON.parse(JSON.stringify(this.matches)) as IMatchView[];
      });
  }

  submitRevision(queryId): Promise<IMatch> {
    return this.matchRepository.saveMatches(this.matches, queryId)
      .toPromise();
  }

  setActiveMatch(activeMatch: IMatch): void {
    this.videoSrc = `${environment.fileStoreRoot}${activeMatch.match_video_path}#t=${activeMatch.match_video_time_span}`;

    if (activeMatch.reference_video_external_source) {
      this.videoSrc = `${environment.externalSource.root}${activeMatch.match_video_path}#t=${activeMatch.match_video_time_span}`;
    }

    this.matches.forEach((match: IMatchView, i: number) => {
      if (activeMatch.id === match.id) {
        match.is_active = true;
        this.activeIndex = i;
        this.matchClicked.emit(this.getActiveMatch());
        return;
      }
    });
  }

  /**
   * Set user validation state for derived match.
   * @param state Nullable boolean. If true user states this is a match.
   * If false use states this is not a match.  If null, user states they are undecided.
   */
  setValidation(state?: boolean): void {
    for (let i = 0; i < this.matches.length; i++) {
      if (this.matches[i].id === this.getActiveMatch().id) {
        this.activeIndex = i;
        this.matches[i].user_match = state;
        this.validationClicked.emit(state);
        return;
      }
    }
  }

  getActiveMatch(): IMatchView {
    if (this.matches && this.activeIndex !== undefined) {
      return this.matches[this.activeIndex];
    }
  }

  resetMatches(): void {
    this.matches = JSON.parse(JSON.stringify(this.matchCache));
    this.videoSrc = null;
    this.activeIndex = null;
  }

  resetCurrentActiveMatch(): void {
    this.matches[this.activeIndex] = JSON.parse(JSON.stringify(this.matchCache[this.activeIndex]));
  }
}
