import { Component } from '@angular/core';
import { NewQueryTwoService } from '../../new-query-two.service';

@Component({
  selector: 'app-specify-new-query',
  templateUrl: './specify-new-query.component.html',
  styleUrls: ['./specify-new-query.component.scss'],
})
export class SpecifyNewQueryTwoComponent {
  constructor(private newQueryService: NewQueryTwoService) {}
}
