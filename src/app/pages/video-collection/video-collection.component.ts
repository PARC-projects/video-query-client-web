import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SearchSetRepository } from 'src/app/repositories/search-set.repository';
import { Video } from 'src/app/models/video.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-video-collection',
  templateUrl: './video-collection.component.html',
  styleUrls: ['./video-collection.component.scss']
})
export class VideoCollectionComponent implements OnInit {
  public videos = [] as Video[];
  public loading = false;
  public showModal = false;
  public videoSrc = '';
  public selectedOrderby = '';

  private collectionId: number;

  constructor(
    private searchSetRepository: SearchSetRepository,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.collectionId = params.id;
      this.getVideosInCollection();
    });
  }

  onOrderByChange() {
    this.getVideosInCollection(this.selectedOrderby);
  }

  onVideoClick(path: string) {
    this.videoSrc = `${environment.fileStoreRoot}${path}`;
    this.showModal = true;
  }

  private getVideosInCollection(ordering = 'name') {
    this.loading = true;
    this.searchSetRepository.getVideosInSearchSet(this.collectionId, ordering)
      .subscribe((resp: Video[]) => {
        this.videos = resp;
      }).add(() => {
        this.loading = false;
      });
  }
}
