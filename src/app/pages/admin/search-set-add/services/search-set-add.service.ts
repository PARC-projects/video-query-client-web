import { Injectable } from '@angular/core';
import { IVideoResponse, Video } from '../../../../models/video.model';
import { ISearchSet, ISearchSetResponse } from '../../../../models/search-set.model';
import { VideoRepository } from '../../../../repositories/video.repository';
import { SearchSetRepository } from '../../../../repositories/search-set.repository';
import { IPagination } from '../../../../models/pagination';
import { AlertService, AlertType } from '../../../../services/alert.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchSetAddService {
  /**
   * New Search Set
   */
  searchSet = {
    videos: [], // Collection of keys
    duration: 10
  } as ISearchSet;

  /**
   * Current videos in selected search set
   */
  videosInSearchSet = [] as Video[];

  /**
   * All videos base on pagination and filters
   */
  videos: Video[];

  paginationConfig: IPagination;
  searchTerm: string;
  perPage = 10;
  selectedSearchSet: ISearchSet;
  searchSets: ISearchSet[];

  constructor(
    private alertService: AlertService,
    private searchSetRepository: SearchSetRepository,
    private videoRepository: VideoRepository
  ) { }

  initialize(page?: number) {
    return this.getVideos(page)
      .then(() => {
        return this.getSearchSets();
      });
  }

  getVideos(page?: number) {
    return this.videoRepository.getAll(page, this.searchTerm, this.perPage)
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
    return this.searchSetRepository.getVideosInSearchSet(id, this.searchTerm)
      .toPromise()
      .then((resp: Video[]) => {
        this.videos = resp;
      });
  }

  addSearchSet(): Promise<ISearchSet> {
    this.videosInSearchSet.forEach(video => {
      this.searchSet.videos.push(video.id);
    });
    return this.searchSetRepository.add(this.searchSet)
      .toPromise()
      .then((resp: ISearchSet) => {
        this.resetState();
        return resp;
      })
      .catch((resp: HttpErrorResponse) => {
        if (resp.error['name']) {
          return Promise.reject(`The name "${this.searchSet.name}" is already being used. Please provide a new name and try again`);
        }
        return Promise.reject('Bad Request');
      });
  }

  isVideoInCurrentSearchSet(video: Video): boolean {
    return this.videosInSearchSet.indexOf(video) > -1;
  }

  removeVideoFromSearchSet(video: Video): void {
    const index = this.videosInSearchSet.indexOf(video);
    if (index > -1) {
      this.videosInSearchSet.splice(index, 1);
    }
  }

  private resetState() {
    this.videosInSearchSet = [];
    this.searchSet = {
      videos: [], // Collection of keys
      duration: 10
    } as ISearchSet;
  }
}
