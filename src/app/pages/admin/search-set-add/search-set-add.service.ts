import { Injectable } from '@angular/core';
import { IVideoResponse, IVideo } from '../../../models/video.model';
import { ISearchSet, ISearchSetResponse } from '../../../models/search-set.model';
import { VideoRepository } from '../../../repositories/video.repository';
import { SearchSetRepository } from '../../../repositories/search-set.repository';

@Injectable({
  providedIn: 'root'
})
export class SearchSetAddService {
  // /**
  //  * All available search sets based on pagination
  //  */
  // searchSets: ISearchSet[];
  /**
   * New Search Set
   */
  searchSet: ISearchSet;
  /**
   * Current videos in selected search set
   */
  videosInSearchSet = [] as IVideo[];
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
    return this.getVideos();
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

  isVideoInCurrentSearchSet(id: number): boolean {
    for (let i = 0; i < this.videosInSearchSet.length; i++) {
      const element = this.videosInSearchSet[i];
      if (id === element.id) {
        return true;
      }
    }
    return false;
  }
}
