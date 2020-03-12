import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchSetRepository } from 'src/app/repositories/search-set.repository';
import { Video } from 'src/app/models/video.model';

@Component({
  selector: 'app-video-collection',
  templateUrl: './video-collection.component.html',
  styleUrls: ['./video-collection.component.scss']
})
export class VideoCollectionComponent implements OnInit {
  public videos = [] as Video[];
  public loading = false;

  constructor(
    private searchSetRepository: SearchSetRepository,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.loading = true;
      this.searchSetRepository.getVideosInSearchSet(params.id)
        .subscribe((resp: Video[]) => {
          this.videos = resp;
        }).add(() => {
          this.loading = false;
        });
    });
  }

}
