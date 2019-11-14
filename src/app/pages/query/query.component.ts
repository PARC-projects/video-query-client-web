import { Component, OnInit } from '@angular/core';
import { QueryService } from './services/query.service';
import { QueryMatchService } from './services/query-match.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss'],
  providers: [
    QueryService
  ]
})
export class QueryComponent implements OnInit {

  private idFromRouteParameter = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.idFromRouteParameter = this.route.snapshot.paramMap.get('id');
  }
}
