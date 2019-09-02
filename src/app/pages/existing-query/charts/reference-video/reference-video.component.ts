import { Component, OnInit, Input, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { IMatchView } from '../../../../models/match.model';
import { ExistingQueryService } from '../../services/existing-query.service';
import { ExistingQueryMatchService } from '../../services/existing-query-match.service';
import { TokenAuthComponent } from 'src/app/components/token-auth/token-auth.component';

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
  isAuthenticated: boolean;

  @ViewChild('videoPlayer', { static: true }) videoPlayer: ElementRef;  // TODO: Strongly type
  @ViewChild(TokenAuthComponent, { static: true }) private tokenAuthComponent: TokenAuthComponent;

  @Input() videoSrc: string;
  @Input() isEditable: boolean;
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
      this.videoPlayer.nativeElement.load();
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

  onAuthorize() {
    this.tokenAuthComponent.open();
  }

  onTokenAuthSubmit() {
    if (this.tokenAuthComponent.authToken.toLowerCase() === 'parc') {
      this.isAuthenticated = true;
    }
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
