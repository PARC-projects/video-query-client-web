import { Injectable } from '@angular/core';
import { IQuery, IQueryView } from '../../../models/query.model';
import { QueryRepository } from '../../../repositories/query.repository';
import { VideoRepository } from '../../../repositories/video.repository';
import { IVideo } from '../../../models/video.model';
import { ISearchSet } from '../../../models/search-set.model';
import { SearchSetRepository } from '../../../repositories/search-set.repository';
import { IQueryResult } from '../../../models/query-result.model';


@Injectable()
export class ExistingQueryService {
  currentQuery = {} as IQueryView;
  videoSrc: string;
  disabled: false;

  private cachedNotes: string; // We cache query notes on load for when the user wants to reset the state of the query.

  constructor(
    private queryRepository: QueryRepository,
    private videoRepository: VideoRepository,
    private searchSetRepository: SearchSetRepository
  ) { }

  getCurrentQuery(queryId: number): Promise<IQuery> {
    return this.queryRepository.getById(queryId)
      .toPromise()
      .then((resp: IQuery) => {
        this.currentQuery = resp as IQueryView;
        this.cachedNotes = this.currentQuery.notes;
      })
      .then(() => {
        return this.getSearchSet();
      })
      .then(() => {
        return this.getVideo();
      })
      .then(() => {
        return this.getResult();
      })
      .then(() => {
        return this.currentQuery;
      });
  }

  getSearchSet(): Promise<void> {
    return this.searchSetRepository.getById(this.currentQuery.search_set_to_query)
      .toPromise()
      .then((resp: ISearchSet) => {
        this.currentQuery.search_set_to_query_object = resp as ISearchSet;
      });
  }

  getVideo(): Promise<void> {
    return this.videoRepository.getById(this.currentQuery.video)
      .toPromise()
      .then((resp: IVideo) => {
        this.currentQuery.video_object = resp as IVideo;
      });
  }

  getResult(): Promise<void> {
    return this.queryRepository.getLatestQueryResult(this.currentQuery.id)
      .toPromise()
      .then((resp: IQueryResult) => {
        this.currentQuery.query_result = resp as IQueryResult;
      });
  }

  updateQueryNote(): Promise<void> {
    return this.queryRepository.updateNote(this.currentQuery.id, this.currentQuery.notes)
      .toPromise();
  }

  updateQueryState(): Promise<void> {
    return this.queryRepository.updateState(this.currentQuery.id, this.currentQuery.process_state)
      .toPromise();
  }
}
