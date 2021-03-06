import { Component, Output, EventEmitter } from '@angular/core';
import { Video } from '../../../../../models/video.model';
import { SearchSetAddService } from '../../services/search-set-add.service';

@Component({
  selector: 'app-search-set-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss']
})
export class CurrentComponent {
  @Output() saveClicked: EventEmitter<void> = new EventEmitter();

  constructor(public searchSetAddService: SearchSetAddService) { }

  onRemove(videoToRemove: Video) {
    this.searchSetAddService.removeVideoFromSearchSet(videoToRemove);
  }

  onSave() {
    this.saveClicked.emit();
  }
}
