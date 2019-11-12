import { Component, Input, OnInit } from '@angular/core';
import { IQuery } from 'src/app/models/query.model';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})
export class QueryComponent implements OnInit {
  @Input() query: IQuery;

  public buttonText = 'Review Matches';
  public stateText = 'In-Progress';

  ngOnInit() {
  }
}
