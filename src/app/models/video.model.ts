import { IPagination } from './pagination';

export interface IVideoResponse {
  results: Video[];
  pagination: IPagination;
}

export class Video {
  id: number;
  name: string;
  path: string;
  external_source: boolean;


  public deserialize(input: Video) {
    this.id = input.id;
    this.name = input.name;
    this.path = input.path;
    this.external_source = input.external_source;

    return this;
  }
}
