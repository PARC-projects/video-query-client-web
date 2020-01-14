import { Component } from '@angular/core';
import { NewQueryTwoService } from '../../new-query-two.service';

@Component({
  selector: 'app-define-new-query',
  templateUrl: './define-new-query.component.html',
  styleUrls: ['./define-new-query.component.scss'],
})
export class DefineNewQueryTwoComponent {
  constructor(private newQueryService: NewQueryTwoService) {}
}
