import { Component, EventEmitter, Output, Input } from '@angular/core';
import { IVideo } from '../../../../../models/video.model';
import { SearchSetAddService } from '../../services/search-set-add.service';
import { environment } from '../../../../../../environments/environment';
import { IPagination } from '../../../../../models/pagination';
import { ISearchSet } from '../../../../../models/search-set.model';

@Component({
  selector: 'app-search-set-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Input() pagination: IPagination;
  @Output() pathClick: EventEmitter<string> = new EventEmitter();
  @Output() perPageSelection: EventEmitter<number> = new EventEmitter();
  @Output() paginationClick: EventEmitter<number> = new EventEmitter();
  @Output() searchSetSelection: EventEmitter<number> = new EventEmitter();
  @Output() searchTermUpdated: EventEmitter<string> = new EventEmitter();



  constructor(public searchSetAddService: SearchSetAddService) { }

  onAdd(videoToAdd: IVideo) {
    if (confirm(`Are you sure you would add "${videoToAdd.name}" to this Search Set?`)) {
      if (this.searchSetAddService.isVideoInCurrentSearchSet(videoToAdd)) {
        alert(`This video is already in the current Search Set.`);
        return;
      }
      this.searchSetAddService.videosInSearchSet.push(videoToAdd);
    }
  }

  onPathClick(path: string): void {
    this.pathClick.emit(`${environment.fileStoreRoot}${path}`);
  }

  onPerPageSelection(perPageSelectedValue: number): void {
    this.perPageSelection.emit(perPageSelectedValue);
  }

  onPaginationClick(pageNumber: number): void {
    this.paginationClick.emit(pageNumber);
  }

  onSelectedSearchSet(): void {
    console.log(this.searchSetAddService.selectedSearchSet);
    this.searchSetAddService.getVideosInSelectedSearchSet(this.searchSetAddService.selectedSearchSet.id);
  }

  onSearchTermUpdated(term: string): void {
    this.searchTermUpdated.emit(term);
  }
}
