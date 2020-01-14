import { Component, OnInit } from '@angular/core';
import { NewQueryTwoService } from '../../new-query-two.service';
import { Video } from 'src/app/models/video.model';

@Component({
  selector: 'app-collection-new-query',
  templateUrl: './collection-new-query.component.html',
  styleUrls: ['./collection-new-query.component.scss'],
})
export class CollectionNewQueryTwoComponent implements OnInit {
  public disableVideoCollectionDropdown = false;
  public viewSelectedChecked = false;
  public addAllChecked = false;

  constructor(private newQueryService: NewQueryTwoService) { }

  async ngOnInit(): Promise<void> {
    await this.newQueryService.getSearchSets();
  }

  onSelectedSearchSet(): void {
  }

  onViewSelectedChecked(): void {
  }

  onAddAllChecked(): void {
    for (const video in this.newQueryService.videos) {
      if (this.newQueryService.videos.hasOwnProperty(video)) {
        const element = this.newQueryService.videos[video];
        element.is_selected = !element.is_selected;
      }
    }
  }

  async onSelectNewVideosClicked(): Promise<void> {
    this.newQueryService.selectedSearchSet = null;
    await this.newQueryService.getVideos();
  }
}
