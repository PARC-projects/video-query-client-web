import { Component, Input, OnInit } from '@angular/core';
import { IQuery, ProcessState } from 'src/app/models/query.model';

@Component({
  selector: 'app-queries-node',
  templateUrl: './queries-node.component.html',
  styleUrls: ['./queries-node.component.scss']
})
export class QueriesNodeComponent implements OnInit {

  public showNotes = false;
  @Input() query: IQuery;

  get buttonText(): string {
    switch (this.query.process_state) {
      case ProcessState.Submitted:
      case ProcessState.Revised:
      case ProcessState.Processing:
      case ProcessState.Processed:
        return 'Train Algorithm';
      case ProcessState.Error:
        return 'Error';
      case ProcessState.Finalized:
      case ProcessState.ProcessFinalized:
        return 'Download Report';
    }
  }

  get stateText(): string {
    switch (this.query.process_state) {
      case ProcessState.Submitted:
      case ProcessState.Revised:
      case ProcessState.Processing:
        return 'Processing Query';
      case ProcessState.Processed:
        return 'Ready for Feedback';
      case ProcessState.Error:
        return 'Error';
      case ProcessState.ProcessFinalized:
        return 'Finalizing Query';
      case ProcessState.Finalized:
        return 'Ready to Export';
    }
  }

  get buttonColor(): string {
    switch (this.query.process_state) {
      case ProcessState.Submitted:
      case ProcessState.Revised:
      case ProcessState.Processing:
        return 'btn-light-secondary disabled';
      case ProcessState.Processed:
        return 'btn-light-orange';
      case ProcessState.Error:
        return 'btn-danger';
      case ProcessState.ProcessFinalized:
        return 'btn-light-secondary disabled';
      case ProcessState.Finalized:
        return 'btn-success';
    }
  }

  get stateColor(): string {
    switch (this.query.process_state) {
      case ProcessState.Submitted:
      case ProcessState.Revised:
      case ProcessState.Processing:
        return 'text-fuchsia';
      case ProcessState.Processed:
        return 'text-light-orange';
      case ProcessState.Error:
        return 'text-danger';
      case ProcessState.ProcessFinalized:
        return 'text-fuchsia';
      case ProcessState.Finalized:
        return 'text-success';
    }
  }

  get stateButton(): number {
    switch (this.query.process_state) {
      case ProcessState.Submitted:
      case ProcessState.Revised:
      case ProcessState.Processing:
        return 1;
      case ProcessState.Processed:
        return 2;
      case ProcessState.Error:
        return 4;
      case ProcessState.ProcessFinalized:
        return 1;
      case ProcessState.Finalized:
        return 3;
    }
  }

  ngOnInit() {
  }

  openNotes() {
    this.showNotes = !this.showNotes;
  }
}
