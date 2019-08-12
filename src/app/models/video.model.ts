import { IPagination } from './pagination';

export interface IVideoResponse {
  results: IVideo[];
  pagination: IPagination;
}

export interface IVideo {
  id: number;
  name: string;
  path: string;
  web_source: boolean;
}
