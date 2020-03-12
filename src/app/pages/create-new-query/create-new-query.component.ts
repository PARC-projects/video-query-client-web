import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-new-query',
  templateUrl: './create-new-query.component.html',
  styleUrls: ['./create-new-query.component.scss']
})
export class CreateNewQueryComponent implements OnInit {

  public form = new FormGroup({
    name: new FormControl(null),
    reference_time: new FormControl(null, Validators.required),
    reference_time_seconds: new FormControl(null, Validators.required),
    reference_time_hours: new FormControl(null, Validators.required),
    reference_time_minutes: new FormControl(null),
    max_matches_for_review: new FormControl(null),
    use_dynamic_target_adjustment: new FormControl(null)
  });

  constructor() { }

  ngOnInit(): void {
  }

}
