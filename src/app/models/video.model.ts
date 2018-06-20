import { IPagination } from './pagination';

export interface IVideoResponse extends IPagination {
  results: IVideo[];
}

export interface IVideo {
  id: number;
  name: string;
  path: string;
}
