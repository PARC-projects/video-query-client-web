import { Component } from '@angular/core';
import { IVideo } from '../../../../../models/video.model';
import { SearchSetAddService } from '../../services/search-set-add.service';

@Component({
  selector: 'app-search-set-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss']
})
export class CurrentComponent {

  constructor(public searchSetAddService: SearchSetAddService) { }

  onRemove(videoToRemove: IVideo) {
    if (confirm(`Are you sure you want to remove ${videoToRemove.name} from this Search Set?`)) {
      this.searchSetAddService.removeVideoFromSearchSet(videoToRemove);
    }
  }
}
