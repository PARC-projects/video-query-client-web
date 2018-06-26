import { Component, OnInit } from '@angular/core';
import { SearchSetService } from './services/search-set.service';

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

  private handleError(): void {
    this.loading = false;
  }
}
