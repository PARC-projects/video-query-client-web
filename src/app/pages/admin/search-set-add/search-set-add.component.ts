import { Component, OnInit } from '@angular/core';
import { SearchSetAddService } from './search-set-add.service';

@Component({
  selector: 'app-search-set-add',
  templateUrl: './search-set-add.component.html',
  styleUrls: ['./search-set-add.component.scss']
})
export class SearchSetAddComponent implements OnInit {
  loading = false;
  constructor(private searchSetAddService: SearchSetAddService) { }

  ngOnInit() {
    this.loading = true;
    this.searchSetAddService.initialize()
      .then(() => {
        this.loading = false;
      })
      .catch(this.handleError);
  }
  private handleError(): void {
    this.loading = false;
  }
}
