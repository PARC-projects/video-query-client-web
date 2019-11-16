import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { QueryService } from './services/query.service';
import { QueryMatchService } from './services/query-match.service';
import { ActivatedRoute } from '@angular/router';
import { IMatch } from 'src/app/models/match.model';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss'],
  providers: [
    QueryService,
    QueryMatchService
  ]
})
export class QueryComponent implements OnInit {


  @ViewChildren('videoPlayer') components: QueryList<ElementRef>;

  isLoading = false;

  constructor(private route: ActivatedRoute,
    public queryMatchService: QueryMatchService,
    public queryService: QueryService) { }

  async ngOnInit() {
    this.isLoading = true;
    await this.queryService.getCurrentQuery(Number(this.route.snapshot.paramMap.get('id')));
    await this.queryMatchService.getMatches(this.queryService.currentQuery.id);
    this.isLoading = false;
  }

  videoMouseOver(match: IMatch) {
    this.components.forEach(element => {
      const attributeId = Number(element.nativeElement.getAttribute('data-message-id'));
      if (attributeId === match.id) {
        element.nativeElement.play();
      }
    });
  }

  videoMouseLeave(match: IMatch) {
    this.components.forEach(element => {
      const attributeId = Number(element.nativeElement.getAttribute('data-message-id'));
      console.log(attributeId + ' ' + match.id);
      if (attributeId === match.id) {
        element.nativeElement.pause();
        element.nativeElement.currentTime = match.match_video_time_span.split(',')[0];
      }
    });
  }
}
