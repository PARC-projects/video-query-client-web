import { Component, OnInit, ViewChildren, QueryList, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { QueryService } from './query.service';
import { Match } from 'src/app/models/match.model';
import { AlertService, AlertType } from 'src/app/services/alert.service';
import { Subscription } from 'rxjs';
import { TokenAuthComponent } from 'src/app/components/token-auth/token-auth.component';
import { MatchService } from './match.service';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss'],
  providers: [
    QueryService,
    MatchService
  ]
})
export class QueryComponent implements OnInit {

  @ViewChildren('videoPlayer') components: QueryList<ElementRef<HTMLVideoElement>>;
  @ViewChild(TokenAuthComponent, { static: true }) private tokenAuthComponent: TokenAuthComponent;

  isLoading = false;
  showExternalAuthenticationPrompt: boolean;

  private timeout: any;
  private matchInitChanges: Subscription;

  constructor(private route: ActivatedRoute,
    public matchService: MatchService,
    public queryService: QueryService,
    private alertService: AlertService,
    private router: Router) {
  }

  async ngOnInit() {
    this.isLoading = true;

    await this.queryService.getCurrentQuery(Number(this.route.snapshot.paramMap.get('id')));
    await this.matchService.getMatches(this.queryService.currentQuery.id);

    this.showExternalAuthenticationPrompt = this.matchService.matches.some((match: Match) => {
      return match.reference_video_external_source;
    });

    if (this.showExternalAuthenticationPrompt) {
      this.tokenAuthComponent.open();
    }

    this.matchInitChanges = this.components.changes.subscribe(() => {
      this.setVideoLoadState();
      this.matchInitChanges.unsubscribe();
    });

    this.isLoading = false;
  }

  onAuthTokenSubmit(): void {
    alert('something');
  }

  videoMouseOver(match: Match) {
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

  videoMouseLeave(match: Match) {
    this.components.forEach(element => {
      if (Number(element.nativeElement.getAttribute('data-message-id')) === match.id) {
        match.is_hovered = false;
        this.stopVideo(element.nativeElement, match);
      }
    });
  }

  videoClick(match: Match) {
    this.components.forEach(element => {
      if (Number(element.nativeElement.getAttribute('data-message-id')) === match.id) {
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
    this.matchService.submitRevision(this.queryService.currentQuery.id)
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
      this.matchService.submitRevision(this.queryService.currentQuery.id)
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
    for (const match of this.matchService.matches) {
      if (Number(video.nativeElement.getAttribute('data-message-id')) === match.id) {
        match.is_loading = false;
        break;
      }
    }
  }

  private stopVideo(video: HTMLVideoElement, match: Match) {
    video.pause();
    video.currentTime = Number(match.match_video_time_span.split(',')[0]);
  }
}
