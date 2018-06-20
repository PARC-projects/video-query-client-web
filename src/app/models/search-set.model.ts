import { IPagination } from './pagination';

export interface ISearchSetResponse extends IPagination {
  results: ISearchSet[];
}

export interface ISearchSet  {
  id: number;
  name: string;
  duration: number;
}
