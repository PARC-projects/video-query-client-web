import { Injectable } from '@angular/core';
import { IVideoResponse, IVideo } from '../../../../models/video.model';
import { ISearchSet } from '../../../../models/search-set.model';
import { VideoRepository } from '../../../../repositories/video.repository';
import { SearchSetRepository } from '../../../../repositories/search-set.repository';

@Injectable({
  providedIn: 'root'
})
export class SearchSetAddService {

  /**
   * New Search Set
   */
  searchSet = {
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
