import { Component, OnInit } from '@angular/core';
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


  public form = new FormGroup({
    name: new FormControl(null),
    search_set_id: new FormControl(null, Validators.required),
    reference_time: new FormControl(null, Validators.required),
    reference_time_seconds: new FormControl(null, Validators.required),
    reference_time_hours: new FormControl(null, Validators.required),
    reference_time_minutes: new FormControl(null),
    max_matches_for_review: new FormControl(null, Validators.required),
    use_dynamic_target_adjustment: new FormControl(null)
  });

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
    this.searchSetRepository.getVideosInSearchSet(this.form.get('search_set_id').value)
      .subscribe((resp: Video[]) => {
        this.videos = resp;
      }).add(() => {
        this.loading = false;
      });
  }
}
