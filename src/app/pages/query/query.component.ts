import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { QueryService } from './query.service';
import { Match } from 'src/app/models/match.model';
import { AlertService, AlertType } from 'src/app/services/alert.service';
import { TokenAuthComponent } from 'src/app/components/token-auth/token-auth.component';
import { MatchService } from './match.service';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss'],
  providers: [
    QueryService,
    MatchService
  ]
})
export class QueryComponent implements OnInit {

  @ViewChild(TokenAuthComponent, { static: true }) private tokenAuthComponent: TokenAuthComponent;

  isLoading = false;
  showExternalAuthenticationPrompt: boolean;

  private timeout: any;


  constructor(private route: ActivatedRoute,
    public matchService: MatchService,
    public queryService: QueryService,
    private alertService: AlertService,
    private router: Router) {
  }

  async ngOnInit() {
    this.isLoading = true;

    await this.queryService.getCurrentQuery(Number(this.route.snapshot.paramMap.get('id')));
    await this.matchService.getMatches(this.queryService.currentQuery.id);

    this.showExternalAuthenticationPrompt = this.matchService.matches.some((match: Match) => {
      return match.reference_video_external_source;
    });

    if (this.showExternalAuthenticationPrompt) {
      this.tokenAuthComponent.open();
    }

    this.isLoading = false;
  }

  onAuthTokenSubmit(wasAuthorized: boolean): void {
    alert(wasAuthorized);
  }

  onAuthorize(): void {
    this.tokenAuthComponent.open();
  }

  async rollBack() {
    if (confirm(`Are you sure you would like to reset the state of "${this.queryService.currentQuery.name}" to when it was loaded?`)) {
      await this.ngOnInit();
    }
  }

  submitMatches(): void {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    const message = `"${this.queryService.currentQuery.name}": has been submitted for feedback. Check back soon for results.`;
    this.isLoading = true;
    this.matchService.submitRevision(this.queryService.currentQuery.id)
      .then(() => {
        return this.queryService.updateQueryNote();
      })
      .then(() => {
        this.alertService.setAlert(message, AlertType.Success);
        this.isLoading = false;
        this.router.navigate(['home']);
      })
      .catch(() => {
        this.isLoading = false;
      });
  }

  submitFinalize(): void {
    if (confirm(`Are you sure you would like to send this query to be finalized?`)) {
      this.isLoading = true;
      this.matchService.submitRevision(this.queryService.currentQuery.id)
        .then(() => {
          return this.queryService.updateQueryStateToProcessFinalized();
        })
        .then(() => {
          const message = `"${this.queryService.currentQuery.name}": has been submitted to be finalized`;
          this.alertService.setAlert(message, AlertType.Success);
          this.isLoading = false;
          this.router.navigate(['home']);
        })
        .catch(() => {
          this.isLoading = false;
        });
    }
  }

  noteChanged(note: string): void {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.isLoading = true;
      this.queryService.currentQuery.notes = note;
      this.queryService.updateQueryNote()
        .then(() => {
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    }, 500);
  }
}
