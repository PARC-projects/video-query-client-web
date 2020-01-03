import { Component } from '@angular/core';
import { NewQueryTwoService } from './new-query-two.service';

@Component({
  selector: 'app-new-query-two',
  templateUrl: './new-query-two.component.html',
  styleUrls: ['./new-query-two.component.scss'],
  providers: [
    NewQueryTwoService
  ]
})
export class NewQueryTwoComponent {
}
