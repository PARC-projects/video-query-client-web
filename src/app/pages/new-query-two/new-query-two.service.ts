import { Injectable } from '@angular/core';
import { Query } from 'src/app/models/query.model';

@Injectable()
export class NewQueryTwoService {
  public query = new Query();
}
