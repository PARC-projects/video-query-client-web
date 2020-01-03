import { Injectable } from '@angular/core';
import { Query } from 'src/app/models/query.model';
import { ISearchSetResponse, ISearchSet } from 'src/app/models/search-set.model';
import { SearchSetRepository } from 'src/app/repositories/search-set.repository';

@Injectable()
export class NewQueryTwoService {
  public query = new Query();

  public searchSets: ISearchSetResponse;
  public selectedSearchSet = null as ISearchSet;

  constructor(private searchSetRepository: SearchSetRepository) {}

  async getSearchSets(): Promise<void> {
    const resp = await this.searchSetRepository.getAll()
      .toPromise();
    this.searchSets = resp;
  }
}
