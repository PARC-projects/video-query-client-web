import { Component, OnInit, ViewChild } from '@angular/core';
import { NewQueryService } from './new-query.service';
import { AlertService, AlertType } from '../../services/alert.service';

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
  currentVideoLength: number;

  @ViewChild('videoPlayer') videoPlayer: any;  // TODO: Strongly type

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
    this.newQueryService.getVideosInSelectedSearchSet()
      .then(() => {
        this.referenceVideosAreLoading = false;
        this.mainFormDisabled = false;
      })
      .catch(this.handleError);
  }

  onReferenceSelect() {
    this.videoLoading = true;
    const url = this.newQueryService.getVideoPathBasedOnId();
    this.videoSrc = url + '#t=' + this.newQueryService.form.reference_time;
    this.videoPlayer.nativeElement.addEventListener('loadeddata', () => {
      this.videoLoading = false;
      this.newQueryService.form.current_video_length = this.videoPlayer.nativeElement.duration;
    }, false);
    this.videoPlayer.nativeElement.load();
  }

  adjustVideoTime(secondsInvalid: boolean, MinutesInvalid: boolean, hoursInvalid: boolean) {
    if (secondsInvalid || MinutesInvalid || hoursInvalid) {
      return;
    }
    this.newQueryService.form.reference_time = this.newQueryService.getFormattedReferenceTime();
    this.videoPlayer.nativeElement.currentTime = this.newQueryService.getCurrentReferenceTimeInSeconds();
  }

  private handleError(): void {
    this.loading = false;
  }
}
