import { Component } from '@angular/core';
import { NewQueryTwoService } from '../../new-query-two.service';

@Component({
  selector: 'app-notes-new-query',
  templateUrl: './notes-new-query.component.html',
  styleUrls: ['./notes-new-query.component.scss'],
})
export class NotesNewQueryTwoComponent {
  constructor(private newQueryService: NewQueryTwoService) {}
}
