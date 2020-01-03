import { Component } from '@angular/core';
import { NewQueryTwoService } from '../../new-query-two.service';

@Component({
  selector: 'app-collection-new-query',
  templateUrl: './collection-new-query.component.html',
  styleUrls: ['./collection-new-query.component.scss'],
})
export class CollectionNewQueryTwoComponent {
  constructor(private newQueryService: NewQueryTwoService) {}
}
