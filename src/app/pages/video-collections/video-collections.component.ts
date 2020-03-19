import { Component, OnInit } from '@angular/core';
import { SearchSetRepository } from 'src/app/repositories/search-set.repository';
import { ISearchSet, ISearchSetResponse } from 'src/app/models/search-set.model';
import { Video } from 'src/app/models/video.model';
import { IListNavConfig } from 'src/app/components/list-nav/list-nav.component';

@Component({
  selector: 'app-video-collections',
  templateUrl: './video-collections.component.html',
  styleUrls: ['./video-collections.component.scss']
})
export class MyVideoCollectionsComponent implements OnInit {
  public searchTerm: string;
  public openCreateNewQueryModal = false;
  public loading = false;
  public listNavConfig: IListNavConfig;
  public perPage = 10;
  public selectedOrderby = '';

  /**
   * All available search sets based on pagination
   */
  public searchSets: ISearchSet[];

  /**
   * Current selected search set
   */
  public searchSet: ISearchSet;

  /**
   * Current videos in selected search set
   */
  public videosInSearchSet = [] as Video[];

  /**
   * All videos base on pagination and filters
   */
  public videos: Video[];

  private timeout: any;

  constructor(private searchSetRepository: SearchSetRepository) { }

  ngOnInit(): void {
    this.getCollections();
  }

  onSelected(id: number) {
    this.loading = true;
    this.searchSetRepository.getById(id)
      .subscribe((resp: ISearchSet) => {
        this.searchSet = resp;
        this.getVideosInSelectedSearchSet(id);
      }).add(() => {
        this.loading = false;
      });
  }

  getVideosInSelectedSearchSet(id: number) {
    this.searchSetRepository.getVideosInSearchSet(id)
      .subscribe((resp: Video[]) => {
        this.videosInSearchSet = resp;
      }).add(() => {
        this.loading = false;
      });
  }

  onOrderByChange() {
    this.getCollections(this.selectedOrderby);
  }

  onSearch(search: string) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.searchTerm = search;
      this.getCollections(this.selectedOrderby ? this.selectedOrderby : 'name');
    }, 500);
  }

  private getCollections(ordering = 'name') {
    this.loading = true;
    this.searchSetRepository.getAll(ordering, this.searchTerm)
      .subscribe((resp: ISearchSetResponse) => {
        this.searchSets = resp.results;
        this.listNavConfig = {
          data: this.searchSets,
          title: 'Video Collections',
          tooltip: 'Select a Video Collection to review.',
          displayPropertyName: 'name',
          pagination: resp.pagination
        } as IListNavConfig;
      }).add(() => {
        this.loading = false;
      });
  }
}
