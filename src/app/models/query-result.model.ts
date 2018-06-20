import { IPagination } from './pagination';
import { IMatch } from './match.model';

export interface IQueryResultResponse extends IPagination {
  results: IQueryResult[];
}

export interface IQueryResult extends IPagination  {
  id: number;
  round: number;
  match_criterion: number;
  weights: number[];
  query_id: number;
  matches: IMatch[];
}
