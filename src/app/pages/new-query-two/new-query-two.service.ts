import { Injectable } from '@angular/core';
import { Query } from 'src/app/models/query.model';
import { ISearchSetResponse, ISearchSet } from 'src/app/models/search-set.model';
import { SearchSetRepository } from 'src/app/repositories/search-set.repository';
import { Video } from 'src/app/models/video.model';
import { VideoRepository } from 'src/app/repositories/video.repository';

@Injectable()
export class NewQueryTwoService {
  public query = new Query();

  // Video Collection
  public searchSets: ISearchSetResponse;
  public selectedSearchSet = null as ISearchSet;
  public videos: Video[];

  constructor(private searchSetRepository: SearchSetRepository,
    private videoRepository: VideoRepository) { }

  async getSearchSets(): Promise<void> {
    const resp = await this.searchSetRepository.getAll()
      .toPromise();
    this.searchSets = resp;
  }

  async getVideos(page?: number, searchTerm?: string, perPage?: number) {
    const resp = await this.videoRepository.getAll(page, searchTerm, perPage)
      .toPromise();
    this.videos = resp.results;
  }
}
