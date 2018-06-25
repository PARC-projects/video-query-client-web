import { Injectable } from '@angular/core';
import { SearchSetRepository } from '../../../../repositories/search-set.repository';
import { ISearchSet, ISearchSetResponse } from '../../../../models/search-set.model';
import { IListNavConfig } from '../../../../components/list-nav/list-nav.component';

@Injectable({
  providedIn: 'root'
})
export class SearchSetService {

  searchSets: ISearchSet[];
  listNavConfig: IListNavConfig;

  constructor(private searchSetRepository: SearchSetRepository) { }

  initialize() {
    return this.searchSetRepository.getAll()
      .subscribe((resp: ISearchSetResponse) => {
        this.searchSets = resp.results;
        this.listNavConfig = {
          data: this.searchSets,
          title: 'Search Sets',
          tooltip: 'Select a Search Set to review.',
          displayPropertyName: 'name'
        } as IListNavConfig;
      });
  }
}
