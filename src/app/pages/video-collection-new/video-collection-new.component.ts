import { Component, OnInit } from '@angular/core';
import { IVideoResponse, Video } from 'src/app/models/video.model';
import { IPagination } from 'src/app/models/pagination';
import { ISearchSet, ISearchSetResponse } from 'src/app/models/search-set.model';
import { VideoRepository } from 'src/app/repositories/video.repository';
import { environment } from 'src/environments/environment';
import { SearchSetRepository } from 'src/app/repositories/search-set.repository';

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
  selectedOrderby = '';

  constructor(
    private searchSetRepository: SearchSetRepository,
    private videoRepository: VideoRepository
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.getVideos();
    this.getSearchSets();
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

  onSelectedSearchSet(): void {
    this.handleSearchEvent();
  }

  onSearchTermUpdated(term: string): void {
    this.searchTerm = term;
    this.handleSearchEvent();
  }

  onOrderByChange() {
    this.getVideos();
  }

  private handleSearchEvent(): void {
    if (this.selectedSearchSet) {
      this.getVideosInSelectedSearchSet();
      return;
    }
    this.getVideos();
  }

  private getVideosInSelectedSearchSet() {
    this.loading = true;
    return this.searchSetRepository.getVideosInSearchSet(this.selectedSearchSet.id, this.searchTerm)
      .subscribe((resp: Video[]) => {
        this.videos = resp;
      }).add(() => {
        this.loading = false;
      });
  }


  private getSearchSets() {
    this.loading = true;
    this.searchSetRepository.getAll()
      .subscribe((resp: ISearchSetResponse) => {
        this.searchSets = resp.results;
      }).add(() => {
        this.loading = false;
      });
  }


  private getVideos(page?: number) {
    this.loading = true;
    return this.videoRepository.getAll(page, this.searchTerm, this.perPage, this.selectedOrderby)
      .subscribe((resp: IVideoResponse) => {
        this.videos = resp.results;
        this.paginationConfig = resp.pagination;
      }).add(() => {
        this.loading = false;
      });
  }
}
