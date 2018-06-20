import { IPagination } from './pagination';

export interface IDnnStream extends IPagination {
  type: string;
  max_number_of_splits: number;
}
