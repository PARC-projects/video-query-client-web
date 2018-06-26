import { Component, OnInit, Input } from '@angular/core';
import { IVideo } from '../../../../../models/video.model';

@Component({
  selector: 'app-search-set-current',
  templateUrl: './search-set-current.component.html',
  styleUrls: ['./search-set-current.component.scss']
})
export class SearchSetCurrentComponent implements OnInit {
  @Input() data: IVideo[];

  constructor() { }

  ngOnInit() {
  }

}
