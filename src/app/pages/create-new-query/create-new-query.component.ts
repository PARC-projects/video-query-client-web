import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
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
  public startingTime = '00:00:00';

  public form = new FormGroup({
    name: new FormControl(null, Validators.required),
    reference_time: new FormControl(this.startingTime, Validators.required),
    max_matches_for_review: new FormControl(null, Validators.required),
    use_dynamic_target_adjustment: new FormControl(false, Validators.required),
    video: new FormControl(null, Validators.required),
    current_video_length: new FormControl(null, Validators.required),
    search_set_to_query: new FormControl(null, Validators.required),
    notes: new FormControl(null),
    process_state: new FormControl(1, Validators.required)
  });

  get reference_time(): AbstractControl {
    return this.form.get('reference_time');
  }

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
        this.videoSrc = null;
        this.form.get('video').setValue(null);
      }).add(() => {
        this.loading = false;
      });
  }

  onSelectCurrentTime() {
    this.form.get('reference_time').setValue(this.getFormattedReferenceTime(this.videoPlayer.nativeElement.currentTime));
  }

  onSubmitForm() {
    this.loading = true;
    this.queryRepository.add(this.form.value)
      .subscribe(() => {
        // this.alertService.setAlert(
        //   `"${this.newQueryService.form.name}": has been submitted. Check back soon for results.`,
        //   AlertType.Success
        // );
        // document.body.scrollTop = document.documentElement.scrollTop = 0;
      }).add(() => {
        this.loading = false;
      });
  }

  onReferenceSelect() {
    this.loading = true;
    this.form.get('reference_time').setValue(this.startingTime);
    const url = this.getVideoPathBasedOnIdAndSetAuthenticationState();
    this.videoSrc = url + '#t=' + this.form.get('reference_time').value;
    this.setVideoElementSource();
  }

  private getVideoPathBasedOnIdAndSetAuthenticationState(): string {
    let url = '';
    for (let i = 0; i < this.videos.length; i++) {
      const video = this.videos[i];
      if (video.id === this.form.get('video').value) {
        url = video.full_path;
        break;
      }
    }
    return url;
  }


  private setVideoElementSource() {
    this.videoPlayer.nativeElement.addEventListener('loadeddata', () => {
      this.loading = false;
      this.form.get('current_video_length').setValue(this.videoPlayer.nativeElement.duration);
    }, false);
    this.videoPlayer.nativeElement.load();
    // TODO: Enable if we want reference_time to update based on seek.
    // this.onSeek();
  }

  private onSeek() {
    this.videoPlayer.nativeElement.addEventListener('seeking', () => {
      console.log(this.videoPlayer.nativeElement.currentTime);
      this.form.get('reference_time').setValue(this.getFormattedReferenceTime(this.videoPlayer.nativeElement.currentTime));
    }, false);
  }

  private getFormattedReferenceTime(timeInSeconds: number): string {
    const hours = Math.floor(timeInSeconds / 3600);
    timeInSeconds = timeInSeconds - hours * 3600;
    const min = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds - min * 60);
    return `${this.leftPad(hours)}:${this.leftPad(min)}:${this.leftPad(seconds)}`;
  }

  private leftPad(originalNumber: number): string {
    let str = originalNumber.toString();
    while (str.length < 2) {
      str = '0' + str;
    }
    return str;
  }
}
