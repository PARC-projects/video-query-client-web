import { IPagination } from './pagination';

export interface IVideoResponse {
  results: Video[];
  pagination: IPagination;
}

export interface Video {
  id: number;
  name: string;
  path: string;
  external_source: boolean;
}
