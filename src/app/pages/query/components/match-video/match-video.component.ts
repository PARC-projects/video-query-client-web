import { Component, Input, ElementRef, QueryList, ViewChildren, AfterViewInit, ViewChild, EventEmitter, Output } from '@angular/core';
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
  @Output() authorize: EventEmitter<void> = new EventEmitter();

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

  onAuthorize() {
    this.authorize.emit();
  }

  videoMouseOver() {
    this.match.is_hovered = true;
    this.stopVideo();
    this.playVideo();
  }

  private playVideo() {
    const playPromise = this.components.first.nativeElement.play();
    if (playPromise !== undefined) { // Older browser check
      playPromise
        .then(() => { })
        .catch((error) => { });
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
