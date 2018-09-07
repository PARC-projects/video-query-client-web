import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IQueryView } from '../../../../models/query.model';

@Component({
  selector: 'app-query-header',
  templateUrl: './query-header.component.html',
  styleUrls: ['./query-header.component.scss']
})
export class QueryHeaderComponent {
  @Input() query = { notes: '' } as IQueryView;
  @Input() isEditable: boolean;
  @Output() resetQuery: EventEmitter<void> = new EventEmitter();
  @Output() revisionSubmit: EventEmitter<void> = new EventEmitter();
  @Output() finalizeSubmit: EventEmitter<void> = new EventEmitter();

  onResetQuery(): void {
    this.resetQuery.emit();
  }

  onRevisionSubmit(): void {
    this.revisionSubmit.emit();
  }

  onFinalizeSubmit(): void {
    this.finalizeSubmit.emit();
  }

  getFormattedName(name: string, length = 25): string {
    if (!name) {
      return name;
    }
    return name.length > length ? name.slice(0, length) + '..' : name;
  }
}
