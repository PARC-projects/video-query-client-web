import { Injectable } from '@angular/core';
import { SearchSetRepository } from '../../../../repositories/search-set.repository';
import { ISearchSet, ISearchSetResponse } from '../../../../models/search-set.model';
import { IListNavConfig } from '../../../../components/list-nav/list-nav.component';
import { Video, IVideoResponse } from '../../../../models/video.model';
import { VideoRepository } from '../../../../repositories/video.repository';

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
  videosInSearchSet: Video[];
  /**
   * All videos base on pagination and filters
   */
  videos: Video[];

  listNavConfig: IListNavConfig;
  searchTerm: string;
  perPage = 10;

  constructor(
    private searchSetRepository: SearchSetRepository
  ) { }

  initialize(page?: number) {
    //    return this.searchSetRepository.getAll(page, this.searchTerm, this.perPage)
    return this.searchSetRepository.getAll('name')
      .toPromise()
      .then((resp: ISearchSetResponse) => {
        this.searchSets = resp.results;
        this.listNavConfig = {
          data: this.searchSets,
          title: 'Video Collections',
          tooltip: 'Select a Video Collection to review.',
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
      .then((resp: Video[]) => {
        this.videosInSearchSet = resp;
      });
  }
}
