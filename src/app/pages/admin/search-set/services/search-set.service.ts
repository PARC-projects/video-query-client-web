import { Injectable } from '@angular/core';
import { SearchSetRepository } from '../../../../repositories/search-set.repository';
import { ISearchSet, ISearchSetResponse } from '../../../../models/search-set.model';

@Injectable({
  providedIn: 'root'
})
export class SearchSetService {

  searchSets: ISearchSet[];

  constructor(private searchSetRepository: SearchSetRepository) { }

  initialize() {
    return this.searchSetRepository.getAll()
      .subscribe((resp: ISearchSetResponse) => {
        this.searchSets = resp.results;
      });
  }
}
