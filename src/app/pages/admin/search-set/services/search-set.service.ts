import { Injectable } from '@angular/core';
import { SearchSetRepository } from '../../../../repositories/search-set.repository';
import { ISearchSet, ISearchSetResponse } from '../../../../models/search-set.model';
import { IListNavConfig } from '../../../../components/list-nav/list-nav.component';
import { IPagination } from '../../../../models/pagination';

@Injectable({
  providedIn: 'root'
})
export class SearchSetService {

  searchSets: ISearchSet[];
  searchSet: ISearchSet;
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
          displayPropertyName: 'name',
          pagination: resp.pagination
        } as IListNavConfig;
      });
  }

  getById(id: number) {
    return this.searchSetRepository.getById(id)
      .subscribe((resp: ISearchSet) => {
        this.searchSet = resp;
      });
  }
}
