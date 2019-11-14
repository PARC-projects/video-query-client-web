import { Component, OnInit } from '@angular/core';
import { QueryService } from './services/query.service';
import { QueryMatchService } from './services/query-match.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss'],
  providers: [
    QueryService,
    QueryMatchService
  ]
})
export class QueryComponent implements OnInit {

  isLoading = false;
  constructor(private route: ActivatedRoute,
    public queryService: QueryService) { }

  async ngOnInit() {
    this.isLoading = true;
    await this.queryService.getCurrentQuery(Number(this.route.snapshot.paramMap.get('id')));
    this.isLoading = false;
  }
}
