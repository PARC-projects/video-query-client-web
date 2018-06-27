import { Injectable } from '@angular/core';
import { SearchSetRepository } from '../../../../repositories/search-set.repository';
import { ISearchSet, ISearchSetResponse } from '../../../../models/search-set.model';
import { IListNavConfig } from '../../../../components/list-nav/list-nav.component';
import { IVideo, IVideoResponse } from '../../../../models/video.model';
import { VideoRepository } from '../../../../repositories/video.repository';

@Injectable({
  providedIn: 'root'
})
export class SearchSetService {
  /**
   * All available search sets based on pagination
   */
  searchSets: ISearchSet[];

  constructor(
    private searchSetRepository: SearchSetRepository
  ) { }

  initialize() {
    return this.searchSetRepository.getAll()
      .toPromise()
      .then((resp: ISearchSetResponse) => {
        this.searchSets = resp.results;
      });
  }
}
