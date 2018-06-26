import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SearchSetService } from '../../services/search-set.service';
import { IVideo } from '../../../../../models/video.model';

@Component({
  selector: 'app-search-set-search',
  templateUrl: './search-set-search.component.html',
  styleUrls: ['./search-set-search.component.scss']
})
export class SearchSetSearchComponent {

  constructor(public searchSetService: SearchSetService) { }

  onRemove(videoToAdd: IVideo) {
    if (confirm(`Are you sure you would add "${videoToAdd.name}" to this Search Set?`)) {

    }
  }
}
