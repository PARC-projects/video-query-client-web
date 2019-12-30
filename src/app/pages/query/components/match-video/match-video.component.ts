import { Component, Input, ElementRef, QueryList, ViewChildren, AfterViewInit, ViewChild } from '@angular/core';
import { Match } from 'src/app/models/match.model';
import { MatchService } from '../../match.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-match-video',
  templateUrl: './match-video.component.html',
  styleUrls: ['./match-video.component.scss']
})
export class MatchVideoComponent implements AfterViewInit {

  @Input() match: Match;
  @ViewChildren('videoPlayer') components: QueryList<ElementRef<HTMLVideoElement>>;
  private videoChange: Subscription;

  constructor(public matchService: MatchService) {
  }

  ngAfterViewInit() {
    // TODO: This is not firing
    this.videoChange = this.components.changes.subscribe(() => {
      this.setVideoLoadState();
      this.videoChange.unsubscribe();
    });
  }

  videoMouseOver() {
    this.match.is_hovered = true;
    this.stopVideo();
    const playPromise = this.components.first.nativeElement.play();
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

  videoMouseLeave() {
    this.match.is_hovered = false;
    this.stopVideo();
  }

  videoClick() {
    this.components.first.nativeElement.requestFullscreen();
  }


  private setVideoLoadState() {
    this.components.first.nativeElement.addEventListener('loadeddata', () => {
      this.match.is_loading = false;
    }, false);
  }

  private stopVideo() {
    this.components.first.nativeElement.pause();
    this.components.first.nativeElement.currentTime = Number(this.match.match_video_time_span.split(',')[0]);
  }
}
