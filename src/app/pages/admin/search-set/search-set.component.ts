import { Component, OnInit } from '@angular/core';
import { SearchSetService } from './services/search-set.service';

@Component({
  selector: 'app-search-set',
  templateUrl: './search-set.component.html',
  styleUrls: ['./search-set.component.scss']
})
export class SearchSetComponent implements OnInit {

  constructor(public searchSetService: SearchSetService) { }

  ngOnInit() {
    this.searchSetService.initialize();
  }
}
