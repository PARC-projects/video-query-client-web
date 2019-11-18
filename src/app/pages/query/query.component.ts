import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { QueryService } from './services/query.service';
import { QueryMatchService } from './services/query-match.service';
import { IMatch } from 'src/app/models/match.model';
import { AlertService, AlertType } from 'src/app/services/alert.service';

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

  @ViewChildren('videoPlayer') components: QueryList<ElementRef<HTMLVideoElement>>;

  isLoading = false;

  constructor(private route: ActivatedRoute,
    public queryMatchService: QueryMatchService,
    public queryService: QueryService,
    private alertService: AlertService) { }

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
        this.stopVideo(element.nativeElement, match);
        element.nativeElement.play();
      }
    });
  }

  videoMouseLeave(match: IMatch) {
    this.components.forEach(element => {
      const attributeId = Number(element.nativeElement.getAttribute('data-message-id'));
      if (attributeId === match.id) {
        this.stopVideo(element.nativeElement, match);
      }
    });
  }

  async rollBack() {
    if (confirm(`Are you sure you would like to reset the state of "${this.queryService.currentQuery.name}" to when it was loaded?`)) {
      await this.ngOnInit();
    }
  }

  submitMatches(): void {
    if (confirm(`Are you sure you would like to submit matches for "${this.queryService.currentQuery.name}"?`)) {
      this.isLoading = true;
      this.queryMatchService.submitRevision(this.queryService.currentQuery.id)
        .then(() => {
          return this.queryService.updateQueryStateToProcessFinalized();
        })
        .then(() => {
          const message = `"${this.queryService.currentQuery.name}": has been submitted`;
          this.alertService.setAlert(message, AlertType.Success);
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    }
  }

  private stopVideo(video: HTMLVideoElement, match: IMatch) {
    video.pause();
    video.currentTime = Number(match.match_video_time_span.split(',')[0]);
  }
}
