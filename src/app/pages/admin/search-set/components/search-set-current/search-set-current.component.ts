import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IVideo } from '../../../../../models/video.model';
import { SearchSetService } from '../../services/search-set.service';

@Component({
  selector: 'app-search-set-current',
  templateUrl: './search-set-current.component.html',
  styleUrls: ['./search-set-current.component.scss']
})
export class SearchSetCurrentComponent {

  constructor(public searchSetService: SearchSetService) { }

  onRemove(videoToRemove: IVideo) {
    if (confirm(`Are you sure you would remove ${videoToRemove.name} from this Search Set?`)) {

    }
  }
}
