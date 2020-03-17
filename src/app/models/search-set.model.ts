import { IPagination } from './pagination';

export interface ISearchSetResponse {
  results: ISearchSet[];
  pagination: IPagination;
}

export interface ISearchSet  {
  id: number;
  name: string;
  duration: number;
  date_created: string;

  /**
   * Collection of FKs
   */
  videos?: number[];
}
