import { Injectable } from '@angular/core';
import { IVideoResponse, IVideo } from '../../../../models/video.model';
import { ISearchSet, ISearchSetResponse } from '../../../../models/search-set.model';
import { VideoRepository } from '../../../../repositories/video.repository';
import { SearchSetRepository } from '../../../../repositories/search-set.repository';
import { IPagination } from '../../../../models/pagination';

@Injectable({
  providedIn: 'root'
})
export class SearchSetAddService {
  /**
   * New Search Set
   */
  searchSet = {
    useDynamicTargetAdjustment: false,
    videos: []
  } as ISearchSet;

  /**
   * Current videos in selected search set
   */
  videosInSearchSet = [] as IVideo[];

  /**
   * All videos base on pagination and filters
   */
  videos: IVideo[];

  paginationConfig: IPagination;
  searchTerm: string;
  perPage = 10;
  selectedSearchSet: ISearchSet;
  searchSets: ISearchSet[];

  constructor(
    private searchSetRepository: SearchSetRepository,
    private videoRepository: VideoRepository
  ) { }

  initialize(page?: number) {
    return this.getVideos(page)
      .then(() => {
        return this.getSearchSets();
      });
  }

  getVideos(page?: number, searchSetId?: number) {
    return this.videoRepository.getAll(page, this.searchTerm, this.perPage, searchSetId)
      .toPromise()
      .then((resp: IVideoResponse) => {
        this.videos = resp.results;
        this.paginationConfig = resp.pagination;
      });
  }

  getSearchSets(): Promise<void> {
    return this.searchSetRepository.getAll()
      .toPromise()
      .then((resp: ISearchSetResponse) => {
        this.searchSets = resp.results;
      });
  }

  getVideosInSelectedSearchSet(id: number) {
    return this.searchSetRepository.getVideosInSearchSet(id)
      .toPromise()
      .then((resp: IVideo[]) => {
        this.videosInSearchSet = resp;
      });
  }

  addSearchSet() {
    this.videosInSearchSet.forEach(video => {
      this.searchSet.videos.push(video.id);
    });
    return this.searchSetRepository.add(this.searchSet)
      .toPromise();
  }

  isVideoInCurrentSearchSet(video: IVideo): boolean {
    return this.videosInSearchSet.indexOf(video) > -1;
  }

  removeVideoFromSearchSet(video: IVideo): void {
    const index = this.videosInSearchSet.indexOf(video);
    if (index > -1) {
      this.videosInSearchSet.splice(index, 1);
    }
  }
}
