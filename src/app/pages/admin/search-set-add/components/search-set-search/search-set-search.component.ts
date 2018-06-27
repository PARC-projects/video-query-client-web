import { Component} from '@angular/core';
import { IVideo } from '../../../../../models/video.model';
import { SearchSetAddService } from '../../search-set-add.service';

@Component({
  selector: 'app-search-set-search',
  templateUrl: './search-set-search.component.html',
  styleUrls: ['./search-set-search.component.scss']
})
export class SearchSetSearchComponent {

  constructor(public searchSetAddService: SearchSetAddService) { }

  onAdd(videoToAdd: IVideo) {
    if (confirm(`Are you sure you would add "${videoToAdd.name}" to this Search Set?`)) {

    }
  }
}
