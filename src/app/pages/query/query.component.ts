import { Component, OnInit, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { QueryService } from './services/query.service';
import { QueryMatchService } from './services/query-match.service';
import { IMatch, IMatchView } from 'src/app/models/match.model';
import { AlertService, AlertType } from 'src/app/services/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss'],
  providers: [
    QueryService,
    QueryMatchService
  ]
})
export class QueryComponent implements OnInit, AfterViewInit {

  @ViewChildren('videoPlayer') components: QueryList<ElementRef<HTMLVideoElement>>;

  isLoading = false;

  private timeout: any;
  private matchInitChanges: Subscription;

  constructor(private route: ActivatedRoute,
    public queryMatchService: QueryMatchService,
    public queryService: QueryService,
    private alertService: AlertService,
    private router: Router) {
  }

  async ngOnInit() {
    this.isLoading = true;
    await this.queryService.getCurrentQuery(Number(this.route.snapshot.paramMap.get('id')));
    await this.queryMatchService.getMatches(this.queryService.currentQuery.id);
    this.matchInitChanges = this.components.changes.subscribe(() => {
      this.setVideoLoadState();
      this.matchInitChanges.unsubscribe();
    });
    this.isLoading = false;
  }

  ngAfterViewInit() {
  }

  videoMouseOver(match: IMatchView) {
    this.components.forEach(element => {
      const attributeId = Number(element.nativeElement.getAttribute('data-message-id'));
      if (attributeId === match.id) {
        match.is_hovered = true;
        this.stopVideo(element.nativeElement, match);
        const playPromise = element.nativeElement.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            /*
              Swallow failed promise
              When user scrolls across a video quickly, pause() is called
              before a video is every loaded.  Just because we play(), does not mean
              the video starts playing immediately and for the matter, is loaded.

              TODO: Check to see if we can be a bit more elegant about this.
                    Is it possible to query load/play stated.
            */
          });
        }
      }
    });
  }

  videoMouseLeave(match: IMatchView) {
    this.components.forEach(element => {
      const attributeId = Number(element.nativeElement.getAttribute('data-message-id'));
      if (attributeId === match.id) {
        match.is_hovered = false;
        this.stopVideo(element.nativeElement, match);
      }
    });
  }

  videoClick(match: IMatchView) {
    this.components.forEach(element => {
      const attributeId = Number(element.nativeElement.getAttribute('data-message-id'));
      if (attributeId === match.id) {
        element.nativeElement.requestFullscreen();
      }
    });
  }

  async rollBack() {
    if (confirm(`Are you sure you would like to reset the state of "${this.queryService.currentQuery.name}" to when it was loaded?`)) {
      await this.ngOnInit();
    }
  }

  submitMatches(): void {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    const message = `"${this.queryService.currentQuery.name}": has been submitted for feedback. Check back soon for results.`;
    this.isLoading = true;
    this.queryMatchService.submitRevision(this.queryService.currentQuery.id)
      .then(() => {
        return this.queryService.updateQueryNote();
      })
      .then(() => {
        this.alertService.setAlert(message, AlertType.Success);
        this.isLoading = false;
        this.router.navigate(['home']);
      })
      .catch(() => {
        this.isLoading = false;
      });
  }

  submitFinalize(): void {
    if (confirm(`Are you sure you would like to send this query to be finalized?`)) {
      this.isLoading = true;
      this.queryMatchService.submitRevision(this.queryService.currentQuery.id)
        .then(() => {
          return this.queryService.updateQueryStateToProcessFinalized();
        })
        .then(() => {
          const message = `"${this.queryService.currentQuery.name}": has been submitted to be finalized`;
          this.alertService.setAlert(message, AlertType.Success);
          this.isLoading = false;
          this.router.navigate(['home']);
        })
        .catch(() => {
          this.isLoading = false;
        });
    }
  }

  noteChanged(note: string): void {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.isLoading = true;
      this.queryService.currentQuery.notes = note;
      this.queryService.updateQueryNote()
        .then(() => {
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    }, 500);
  }

  private setVideoLoadState() {
    this.components.forEach(video => {
      video.nativeElement.addEventListener('loadeddata', () => {
        this.setMatchingMatchToLoadingFalse(video);
      }, false);
    });
  }

  private setMatchingMatchToLoadingFalse(video: ElementRef<HTMLVideoElement>) {
    for (const match of this.queryMatchService.matches) {
      const attributeId = Number(video.nativeElement.getAttribute('data-message-id'));
      if (attributeId === match.id) {
        match.is_loading = false;
        break;
      }
    }
  }

  private stopVideo(video: HTMLVideoElement, match: IMatch) {
    video.pause();
    video.currentTime = Number(match.match_video_time_span.split(',')[0]);
  }
}
