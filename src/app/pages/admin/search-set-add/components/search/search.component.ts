import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Video } from '../../../../../models/video.model';
import { SearchSetAddService } from '../../services/search-set-add.service';
import { IPagination } from '../../../../../models/pagination';

@Component({
  selector: 'app-search-set-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Input() pagination: IPagination;
  @Output() pathClick: EventEmitter<Video> = new EventEmitter();
  @Output() perPageSelection: EventEmitter<number> = new EventEmitter();
  @Output() paginationClick: EventEmitter<number> = new EventEmitter();
  @Output() selectedSearchSet: EventEmitter<void> = new EventEmitter();
  @Output() searchTermUpdated: EventEmitter<void> = new EventEmitter();

  private timeout: any;

  constructor(public searchSetAddService: SearchSetAddService) { }

  onAdd(videoToAdd: Video) {
    if (this.searchSetAddService.isVideoInCurrentSearchSet(videoToAdd)) {
      alert(`This video is already in the current Video Collection.`);
      return;
    } else {
      this.searchSetAddService.videosInSearchSet.push(videoToAdd);
    }
  }

  onPathClick(video: Video): void {
    this.pathClick.emit(video);
  }

  onPerPageSelection(perPageSelectedValue: number): void {
    this.perPageSelection.emit(perPageSelectedValue);
  }

  onPaginationClick(pageNumber: number): void {
    this.paginationClick.emit(pageNumber);
  }

  onSelectedSearchSet(): void {
    this.selectedSearchSet.emit();
  }

  onSearchTermUpdated(term: string): void {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.searchSetAddService.searchTerm = term;
      this.searchTermUpdated.emit();
    }, 500);
  }
}
