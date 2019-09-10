import { Injectable } from '@angular/core';
import { IVideo } from '../../models/video.model';
import { IQuery, ProcessState, IQueryResponse } from '../../models/query.model';
import { QueryRepository } from '../../repositories/query.repository';
import { ISearchSetResponse, ISearchSet } from '../../models/search-set.model';
import { SearchSetRepository } from '../../repositories/search-set.repository';
import { environment } from '../../../environments/environment';

export interface IQueryForm extends IQuery {
  reference_time_seconds: number;
  reference_time_minutes: number;
  reference_time_hours: number;
  current_video_length?: number;
}

@Injectable()
export class NewQueryService {
  searchSets: ISearchSetResponse;
  videos: IVideo[];
  selectedSearchSet: ISearchSet;
  form = {
    name: '',
    reference_time: '00:00:00',
    reference_time_seconds: 0,
    reference_time_hours: 0,
    reference_time_minutes: 0,
    max_matches_for_review: 10,
    use_dynamic_target_adjustment: false
  } as IQueryForm;

  showAuthentication: boolean;

  constructor(
    private searchSetRepository: SearchSetRepository,
    private queryRepository: QueryRepository
  ) { }

  async init(): Promise<void> {
    const resp = await this.searchSetRepository.getAll()
      .toPromise();
    this.searchSets = resp;
  }

  async getVideosInSelectedSearchSet(): Promise<void> {
    const resp = await this.searchSetRepository.getVideosInSearchSet(this.selectedSearchSet.id)
      .toPromise();
    this.videos = resp;
  }

  getVideoPathBasedOnIdAndSetAuthenticationState(): string {
    let url = '';
    this.showAuthentication = false;
    for (let i = 0; i < this.videos.length; i++) {
      const video = this.videos[i];

      if (video.id === this.form.video) {
        if (video.external_source) {
          this.showAuthentication = true;
        }

        if (video.external_source) {
          url = `${environment.externalSource.root}${video.path}`;
          break;
        }

        url = `${environment.fileStoreRoot}${video.path}`;
      }
    }
    return url;
  }

  submitForm(): Promise<IQueryResponse> {
    this.form.process_state = ProcessState.Submitted;
    // Remove tracking properties before submitting
    delete this.form.reference_time_hours;
    delete this.form.reference_time_minutes;
    delete this.form.reference_time_seconds;
    return this.queryRepository.add(this.form)
      .toPromise();
  }

  /**
   * Get current reference time in seconds.
   * If greater then current video length, return 0;
   */
  getCurrentReferenceTimeInSeconds(): number {
    const hours = this.form.reference_time_hours * 60 * 60;
    const min = this.form.reference_time_minutes * 60;
    const seconds = parseFloat(this.form.reference_time_seconds.toString());
    const totalSeconds = hours + min + seconds;
    if (totalSeconds < this.form.current_video_length) {
      return totalSeconds;
    }
    return 0;
  }

  getFormattedReferenceTime(): string {
    return `${this.leftPad(this.form.reference_time_hours)}:` +
      `${this.leftPad(this.form.reference_time_minutes)}:` +
      `${this.leftPad(this.form.reference_time_seconds)}`;
  }

  private leftPad(originalNumber: number): string {
    let str = originalNumber.toString();
    while (str.length < 2) {
      str = '0' + str;
    }
    return str;
  }
}
