import { Injectable } from '@angular/core';
import { ISearchSet, ISearchSetResponse } from 'src/app/models/search-set.model';
import { Video } from 'src/app/models/video.model';
import { IListNavConfig } from 'src/app/components/list-nav/list-nav.component';
import { SearchSetRepository } from 'src/app/repositories/search-set.repository';

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
    return this.searchSetRepository.getAll(page, this.searchTerm, this.perPage)
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
