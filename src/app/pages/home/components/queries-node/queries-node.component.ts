import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IQuery, ProcessState } from 'src/app/models/query.model';
import { ModalComponent } from 'src/app/components/modal/modal.component';

@Component({
  selector: 'app-queries-node',
  templateUrl: './queries-node.component.html',
  styleUrls: ['./queries-node.component.scss']
})
export class QueriesNodeComponent implements OnInit {

  @ViewChild(ModalComponent, { static: true }) private modalComponent: ModalComponent;
  @Input() query: IQuery;

  get buttonText(): string {
    switch (this.query.process_state) {
      case ProcessState.Submitted:
      case ProcessState.Revised:
      case ProcessState.Processing:
      case ProcessState.Processed:
        return 'Review Matches';
      case ProcessState.Error:
        return 'Download Report';
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
        return 'In Progress';
      case ProcessState.Processed:
        return 'Ready for Review';
      case ProcessState.Error:
        return 'Error';
      case ProcessState.Finalized:
        return 'In Progress';
      case ProcessState.ProcessFinalized:
        return 'Ready for Download';
    }
  }

  get buttonColor(): string {
    switch (this.query.process_state) {
      case ProcessState.Submitted:
      case ProcessState.Revised:
      case ProcessState.Processing:
        return 'btn-secondary btn-light-secondary disabled';
      case ProcessState.Processed:
        return 'btn-light-orange';
      case ProcessState.Error:
        return 'btn-danger';
      case ProcessState.Finalized:
        return 'btn-secondary btn-light-secondary disabled';
      case ProcessState.ProcessFinalized:
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
      case ProcessState.Finalized:
        return 'text-fuchsia';
      case ProcessState.ProcessFinalized:
        return 'text-success';
    }
  }

  ngOnInit() {
  }

  openNotes() {
    this.modalComponent.open();
  }
}
