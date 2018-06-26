import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IVideo } from '../../../../../models/video.model';

@Component({
  selector: 'app-search-set-current',
  templateUrl: './search-set-current.component.html',
  styleUrls: ['./search-set-current.component.scss']
})
export class SearchSetCurrentComponent {
  @Input() data: IVideo[];
  @Output() remove: EventEmitter<IVideo> = new EventEmitter();

  onRemove(video: IVideo) {
    this.remove.emit(video);
  }
}
