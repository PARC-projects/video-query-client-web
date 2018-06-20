import { Injectable } from '@angular/core';
import { QueryRepository } from '../../repositories/query.repository';
import { IQueryResponse, IQuery } from '../../models/query.model';

@Injectable()
export class HomeService {
  queries: IQueryResponse;
  selectedQuery = {} as IQuery;

  constructor(
    private queryRepository: QueryRepository
  ) {
  }

  init(): void {
    this.queryRepository.getAll()
      .subscribe((resp: IQueryResponse) => {
        this.queries = resp;
      });
  }
}
