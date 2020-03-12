import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ISearchSetResponse } from 'src/app/models/search-set.model';
import { SearchSetRepository } from 'src/app/repositories/search-set.repository';
import { QueryRepository } from 'src/app/repositories/query.repository';
import { Video } from 'src/app/models/video.model';

@Component({
  selector: 'app-create-new-query',
  templateUrl: './create-new-query.component.html',
  styleUrls: ['./create-new-query.component.scss']
})
export class CreateNewQueryComponent implements OnInit {

  public loading = false;
  public searchSets: ISearchSetResponse;
  public videos: Video[];
  public videoSrc: string;

  public form = new FormGroup({
    name: new FormControl(null, Validators.required),
    reference_time: new FormControl(null, Validators.required),
    max_matches_for_review: new FormControl(null, Validators.required),
    use_dynamic_target_adjustment: new FormControl(false, Validators.required),
    video: new FormControl(null, Validators.required),
    current_video_length: new FormControl(null, Validators.required),
    search_set_to_query: new FormControl(null, Validators.required),
    notes: new FormControl(null),
    process_state: new FormControl(1, Validators.required),

    reference_time_seconds: new FormControl(null),  // tracking
    reference_time_hours: new FormControl(null),  // tracking
    reference_time_minutes: new FormControl(null), // tracking
  });

  @ViewChild('videoPlayer', { static: true }) videoPlayer: ElementRef<HTMLVideoElement>;

  constructor(
    private searchSetRepository: SearchSetRepository,
    private queryRepository: QueryRepository
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.searchSetRepository.getAll()
      .subscribe((resp: ISearchSetResponse) => {
        this.searchSets = resp;
      }).add(() => {
        this.loading = false;
      });
  }

  onSelectedSearchSet() {
    this.searchSetRepository.getVideosInSearchSet(this.form.get('search_set_to_query').value)
      .subscribe((resp: Video[]) => {
        this.videos = resp;
      }).add(() => {
        this.loading = false;
      });
  }

  onReferenceSelect() {
    this.loading = true;
    // TODO: A bit of a code smell. Abstract the two intents of the service call.
    const url = this.getVideoPathBasedOnIdAndSetAuthenticationState();
    this.videoSrc = url + '#t=' + this.form.get('reference_time').value;

    // if (this.newQueryService.showAuthentication) {
    //   return this.handleUnauthenticatedState();
    // }

    this.setVideoElementSource();
  }

  private getVideoPathBasedOnIdAndSetAuthenticationState(): string {
    let url = '';
    // this.showAuthentication = false;
    for (let i = 0; i < this.videos.length; i++) {
      const video = this.videos[i];
      if (video.id === this.form.get('video').value) {
        // this.showAuthentication = !video.is_authenticated;
        url = video.full_path;
        break;
      }
    }
    return url;
  }

  private setVideoElementSource() {
    // this.videoDisplayState = VideoDisplayStateEnum.Valid;
    this.videoPlayer.nativeElement.addEventListener('loadeddata', () => {
      this.loading = false;
      this.form.get('current_video_length').setValue(this.videoPlayer.nativeElement.duration);
    }, false);
    this.videoPlayer.nativeElement.load();
    this.onSeek();
  }

  private onSeek() {
    this.videoPlayer.nativeElement.addEventListener('seeking', () => {
      let time = this.videoPlayer.nativeElement.currentTime;
      this.form.get('reference_time_hours').setValue(Math.floor(time / 3600));
      time = time - this.form.get('reference_time_hours').value * 3600;
      this.form.get('reference_time_minutes').setValue(Math.floor(time / 60));
      this.form.get('reference_time_seconds').setValue(Math.floor(time - this.form.get('reference_time_minutes').value * 60));
    }, false);
  }
}
