import { Injectable } from '@angular/core';
import { SearchSetRepository } from '../../../../repositories/search-set.repository';
import { ISearchSet, ISearchSetResponse } from '../../../../models/search-set.model';
import { IListNavConfig } from '../../../../components/list-nav/list-nav.component';
import { IVideo } from '../../../../models/video.model';

@Injectable({
  providedIn: 'root'
})
export class SearchSetService {
  /**
   * All available search sets based on pagination
   */
  searchSets: ISearchSet[];
  /**
   * Current selected search set
   */
  searchSet: ISearchSet;
  /**
   * Current videos in selected search set
   */
  videosInSearchSet: IVideo[];
  listNavConfig: IListNavConfig;

  constructor(private searchSetRepository: SearchSetRepository) { }

  initialize() {
    return this.searchSetRepository.getAll()
      .toPromise()
      .then((resp: ISearchSetResponse) => {
        this.searchSets = resp.results;
        this.listNavConfig = {
          data: this.searchSets,
          title: 'Search Sets',
          tooltip: 'Select a Search Set to review.',
          displayPropertyName: 'name',
          pagination: resp.pagination
        } as IListNavConfig;
      });
  }

  getById(id: number) {
    return this.searchSetRepository.getById(id)
      .toPromise()
      .then((resp: ISearchSet) => {
        this.searchSet = resp;
        return this.getVideosInSelectedSearchSet(id);
      });
  }

  getVideosInSelectedSearchSet(id: number) {
    return this.searchSetRepository.getVideosInSearchSet(id)
      .toPromise()
      .then((resp: IVideo[]) => {
        this.videosInSearchSet = resp;
      });
  }
}
