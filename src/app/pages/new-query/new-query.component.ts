import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NewQueryService } from './new-query.service';
import { AlertService, AlertType } from '../../services/alert.service';
import { environment } from '../../../environments/environment';
import { TokenAuthComponent } from 'src/app/components/token-auth/token-auth.component';

enum VideoDisplayStateEnum {
  Empty,
  Unauthorized,
  Valid
}

@Component({
  selector: 'app-new-query-page',
  templateUrl: './new-query.component.html',
  styleUrls: ['./new-query.component.scss'],
  providers: [
    NewQueryService
  ]
})
export class NewQueryComponent implements OnInit {
  loading = false;
  videoLoading = false;
  disabled = false;
  mainFormDisabled = false;
  referenceVideosAreLoading = false;
  videoSrc: string;
  videoDisplayState = VideoDisplayStateEnum.Empty;
  currentVideoLength: number;
  environment = environment;

  @ViewChild('videoPlayer', { static: true }) videoPlayer: ElementRef<HTMLVideoElement>;
  @ViewChild(TokenAuthComponent, { static: true }) private tokenAuthComponent: TokenAuthComponent;

  constructor(
    private alertService: AlertService,
    public newQueryService: NewQueryService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.disabled = this.loading;
    this.mainFormDisabled = this.loading;
    this.newQueryService.init()
      .then(() => {
        this.loading = false;
        this.disabled = this.loading;
      })
      .catch(this.handleError);
  }

  onSubmitForm() {
    this.loading = true;
    this.newQueryService.submitForm()
      .then(() => {
        this.disabled = true;
        this.loading = false;
        this.alertService.setAlert(
          `"${this.newQueryService.form.name}": has been submitted. Check back soon for results.`,
          AlertType.Success
        );
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      })
      .catch(this.handleError);
  }

  onSelectedSearchSet() {
    this.referenceVideosAreLoading = true;
    this.newQueryService.form.video = null;
    this.videoDisplayState = VideoDisplayStateEnum.Empty;
    this.newQueryService.getVideosInSelectedSearchSet()
      .then(() => {
        this.referenceVideosAreLoading = false;
        this.mainFormDisabled = false;
      })
      .catch(() => {
        this.loading = false;
        this.handleError();
      });
  }

  onReferenceSelect() {
    this.videoLoading = true;
    this.videoDisplayState = VideoDisplayStateEnum.Empty;
    // TODO: A bit of a code smell. Abstract the two intents of the service call.
    const url = this.newQueryService.getVideoPathBasedOnIdAndSetAuthenticationState();
    this.videoSrc = url + '#t=' + this.newQueryService.form.reference_time;

    if (this.newQueryService.showAuthentication) {
      return this.handleUnauthenticatedState();
    }

    this.setVideoElementSource();
  }

  onAuthSubmitted(authenticated: boolean) {
    if (authenticated) {
      this.setVideoElementSource();
    }
  }

  onAuthorize() {
    this.handleUnauthenticatedState();
  }

  adjustVideoTime(secondsInvalid: boolean, MinutesInvalid: boolean, hoursInvalid: boolean) {
    if (secondsInvalid || MinutesInvalid || hoursInvalid) {
      return;
    }
    this.newQueryService.form.reference_time = this.newQueryService.getFormattedReferenceTime();
    this.videoPlayer.nativeElement.currentTime = this.newQueryService.getCurrentReferenceTimeInSeconds();
  }

  private handleUnauthenticatedState() {
    this.tokenAuthComponent.open();
    this.videoDisplayState = VideoDisplayStateEnum.Unauthorized;
    this.videoLoading = false;
  }

  private setVideoElementSource() {
    this.videoDisplayState = VideoDisplayStateEnum.Valid;
    this.videoPlayer.nativeElement.addEventListener('loadeddata', () => {
      this.videoLoading = false;
      this.newQueryService.form.current_video_length = this.videoPlayer.nativeElement.duration;
    }, false);
    this.videoPlayer.nativeElement.load();
    this.onSeek();
  }

  private onSeek() {
    this.videoPlayer.nativeElement.addEventListener('seeking', () => {
      let time = this.videoPlayer.nativeElement.currentTime;
      this.newQueryService.form.reference_time_hours = Math.floor(time / 3600);
      time = time - this.newQueryService.form.reference_time_hours * 3600;
      this.newQueryService.form.reference_time_minutes = Math.floor(time / 60);
      this.newQueryService.form.reference_time_seconds = Math.floor(time - this.newQueryService.form.reference_time_minutes * 60);
    }, false);
  }

  private handleError(): void {
    this.loading = false;
  }
}
