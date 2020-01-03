import { Component } from '@angular/core';
import { NewQueryTwoService } from '../../new-query-two.service';

@Component({
  selector: 'app-reference-new-query',
  templateUrl: './reference-new-query.component.html',
  styleUrls: ['./reference-new-query.component.scss'],
})
export class ReferenceNewQueryTwoComponent {
  constructor(private newQueryService: NewQueryTwoService) {}
}
