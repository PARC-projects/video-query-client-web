import { IPagination } from './pagination';
import { IVideo } from './video.model';

export interface ISearchSetResponse {
  results: ISearchSet[];
  pagination: IPagination;
}

export interface ISearchSet  {
  id: number;
  name: string;
  duration: number;
  useDynamicTargetAdjustment: boolean;
  videos?: number[];
}
