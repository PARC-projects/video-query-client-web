import { Injectable } from '@angular/core';
import { IVideoResponse, IVideo } from '../../../models/video.model';
import { ISearchSet, ISearchSetResponse } from '../../../models/search-set.model';
import { VideoRepository } from '../../../repositories/video.repository';
import { SearchSetRepository } from '../../../repositories/search-set.repository';

@Injectable({
  providedIn: 'root'
})
export class SearchSetAddService {
  /**
   * All available search sets based on pagination
   */
  searchSets: ISearchSet[];
  /**
   * Current selected search set
   */
  searchSet: ISearchSet;
  /**
   * Current videos in selected search set
   */
  videosInSearchSet: IVideo[];
  /**
   * All videos base on pagination and filters
   */
  videos: IVideo[];

  form = {

  } as ISearchSet;

  constructor(
    private searchSetRepository: SearchSetRepository,
    private videoRepository: VideoRepository
  ) { }

  initialize() {
    return this.searchSetRepository.getAll()
      .toPromise()
      .then((resp: ISearchSetResponse) => {
        this.searchSets = resp.results;
        return this.getVideos();
      });
  }

  getVideos() {
    return this.videoRepository.getAll()
      .toPromise()
      .then((resp: IVideoResponse) => {
        this.videos = resp.results;
      });
  }

  getById(id: number) {
    return this.searchSetRepository.getById(id)
      .toPromise()
      .then((resp: ISearchSet) => {
        this.searchSet = resp;
        return this.getVideosInSelectedSearchSet(id);
      });
  }

  getVideosInSelectedSearchSet(id: number) {
    return this.searchSetRepository.getVideosInSearchSet(id)
      .toPromise()
      .then((resp: IVideo[]) => {
        this.videosInSearchSet = resp;
      });
  }
}