import { Component, OnInit } from '@angular/core';
import { SearchSetService } from './services/search-set.service';
import { IVideo } from '../../../models/video.model';

@Component({
  selector: 'app-search-set',
  templateUrl: './search-set.component.html',
  styleUrls: ['./search-set.component.scss']
})
export class SearchSetComponent implements OnInit {
  loading = false;

  constructor(public searchSetService: SearchSetService) { }

  ngOnInit() {
    this.loading = true;
    this.searchSetService.initialize()
      .then(() => {
        this.loading = false;
      })
      .catch(this.handleError);
  }

  onSearch($event) {
    console.log(1);
  }

  onPerPageSelection($event) {
    console.log(2);
  }

  onPaginationClick(): void {
    console.log(4);
  }

  onSelected(id: number) {
    this.loading = true;
    this.searchSetService.getById(id)
      .then(() => {
        this.loading = false;
      })
      .catch(this.handleError);
  }

  onRemove(videoToRemove: IVideo) {
    if (confirm(`Are you sure you would remove ${videoToRemove.name} from this Search Set?`)) {

    }
  }

  private handleError(): void {
    this.loading = false;
  }
}
