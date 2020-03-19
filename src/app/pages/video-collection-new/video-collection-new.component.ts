import { Component, OnInit } from '@angular/core';
import { IVideoResponse, Video } from 'src/app/models/video.model';
import { IPagination } from 'src/app/models/pagination';
import { ISearchSet } from 'src/app/models/search-set.model';
import { VideoRepository } from 'src/app/repositories/video.repository';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-video-collection-new',
  templateUrl: './video-collection-new.component.html',
  styleUrls: ['./video-collection-new.component.scss']
})
export class VideoCollectionNewComponent implements OnInit {
  public loading = false;

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
  videoSrc = '';
  showModal = false;

  constructor(
    private videoRepository: VideoRepository
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.getVideos();
  }

  onVideoClick(path: string) {
    this.videoSrc = `${environment.fileStoreRoot}${path}`;
    this.showModal = true;
  }

  onPerPageSelection(perPageSelectedValue: number) {
    this.perPage = perPageSelectedValue;
    this.getVideos(1);
  }

  onPaginationClick(pageNumber: number): void {
    this.getVideos(pageNumber);
  }


  private getVideos(page?: number) {
    return this.videoRepository.getAll(page, this.searchTerm, this.perPage)
      .subscribe((resp: IVideoResponse) => {
        this.videos = resp.results;
        this.paginationConfig = resp.pagination;
      }).add(() => {
        this.loading = false;
      });
  }
}
