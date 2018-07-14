import { Component, EventEmitter, Output} from '@angular/core';
import { IVideo } from '../../../../../models/video.model';
import { SearchSetAddService } from '../../search-set-add.service';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-search-set-search',
  templateUrl: './search-set-search.component.html',
  styleUrls: ['./search-set-search.component.scss']
})
export class SearchSetSearchComponent {
  @Output() pathClick: EventEmitter<string> = new EventEmitter();

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
}
