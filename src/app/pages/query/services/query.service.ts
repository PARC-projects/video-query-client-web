import { Injectable } from '@angular/core';
import { IQuery, IQueryView, ProcessState } from '../../../models/query.model';
import { QueryRepository } from '../../../repositories/query.repository';
import { VideoRepository } from '../../../repositories/video.repository';
import { IVideo } from '../../../models/video.model';
import { ISearchSet } from '../../../models/search-set.model';
import { SearchSetRepository } from '../../../repositories/search-set.repository';
import { IQueryResult } from '../../../models/query-result.model';


@Injectable()
export class QueryService {
  currentQuery = {} as IQueryView;
  disabled: false;

  private cachedNotes: string; // We cache query notes on load for when the user wants to reset the state of the query.

  constructor(
    private queryRepository: QueryRepository,
    private videoRepository: VideoRepository,
    private searchSetRepository: SearchSetRepository
  ) { }

  async getCurrentQuery(queryId: number): Promise<IQuery> {
    const resp = await this.queryRepository.getById(queryId)
      .toPromise();
    this.currentQuery = (resp as IQueryView);
    this.cachedNotes = this.currentQuery.notes;
    await this.getSearchSet();
    await this.getVideo();
    await this.getResult();
    return this.currentQuery;
  }

  async getSearchSet(): Promise<void> {
    const resp = await this.searchSetRepository.getById(this.currentQuery.search_set_to_query)
      .toPromise();
    this.currentQuery.search_set_to_query_object = (resp as ISearchSet);
  }

  async getVideo(): Promise<void> {
    const resp = await this.videoRepository.getById(this.currentQuery.video)
      .toPromise();
    this.currentQuery.video_object = (resp as IVideo);
  }

  async getResult(): Promise<void> {
    const resp = await this.queryRepository.getLatestQueryResult(this.currentQuery.id)
      .toPromise();
    this.currentQuery.query_result = (resp as IQueryResult);
  }

  updateQueryNote(): Promise<void> {
    return this.queryRepository.updateNote(this.currentQuery.id, this.currentQuery.notes)
      .toPromise();
  }

  async updateQueryStateToProcessFinalized(): Promise<void> {
    this.currentQuery.process_state = ProcessState.ProcessFinalized;
    await this.queryRepository.updateState(this.currentQuery.id, this.currentQuery.process_state)
      .toPromise();
    return this.updateQueryNote();
  }
}
