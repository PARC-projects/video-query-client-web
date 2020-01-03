import { Component, OnInit } from '@angular/core';
import { NewQueryTwoService } from '../../new-query-two.service';

@Component({
  selector: 'app-collection-new-query',
  templateUrl: './collection-new-query.component.html',
  styleUrls: ['./collection-new-query.component.scss'],
})
export class CollectionNewQueryTwoComponent implements OnInit {
  public disableVideoCollectionDropdown = false;

  constructor(private newQueryService: NewQueryTwoService) { }

  async ngOnInit(): Promise<void> {
    await this.newQueryService.getSearchSets();
  }

  onSelectedSearchSet(): void {

  }

  onSelectNewVideosClicked(): void {
    this.newQueryService.selectedSearchSet = null;
  }
}
