import { Component, OnInit, Input, ViewChild, Output, EventEmitter, OnChanges } from '@angular/core';
import { IMatchView } from '../../../../models/match.model';
import { ExistingQueryService } from '../../services/existing-query.service';
import { ExistingQueryMatchService } from '../../services/existing-query-match.service';

export interface IValidationClick {
  state: boolean;
  id: number;
}

@Component({
  selector: 'app-reference-video',
  templateUrl: './reference-video.component.html',
  styleUrls: ['./reference-video.component.scss']
})
export class ReferenceVideoComponent implements OnInit {
  loading = false;
  @Input() videoSrc: string;
  @Input() isEditable: boolean;
  @ViewChild('videoPlayer') videoPlayer: any;  // TODO: Strongly type
  @Output() resetCurrentActiveMatch: EventEmitter<number> = new EventEmitter();

  private matchClickedSubscription: any;  // TODO: Strongly type
  private currentState = {} as IValidationClick;

  constructor(
    public matchService: ExistingQueryMatchService,
    public existingQueryService: ExistingQueryService) {
  }

  ngOnInit() {
    this.matchClickedSubscription = this.matchService.matchClicked
      .subscribe((item: IMatchView) => this.onMatchClicked(item));
  }

  onResetMatch() {
    if (!this.matchService.activeIndex) {
      alert(`There currently is no match selected.`);
      return;
    }
    if (confirm(`Are you sure you would like to reset the currently selected match?`)) {
      this.resetCurrentActiveMatch.emit();
    }
  }

  onMatchClicked(item: any) {
    this.loading = true;
    this.videoPlayer.nativeElement.load();
    this.videoPlayer.nativeElement.addEventListener('loadeddata', () => {
      this.loading = false;
      this.currentState.state = undefined;
      this.currentState.id = item.id;
    }, false);
  }

  /**
   * Set user validation state for derived match.
   * @param state Nullable boolean. If true user states this is a match.
   * If false use states this is not a match.  If null, user states they are undecided.
   */
  onValidationClicked(state?: boolean): void {
    this.matchService.setValidation(state);
  }
}
