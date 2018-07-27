import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchSetAddService } from './services/search-set-add.service';
import { ModalComponent } from '../../../components/modal/modal.component';
import { Router } from '@angular/router';
import { AlertService, AlertType } from '../../../services/alert.service';

@Component({
  selector: 'app-search-set-add',
  templateUrl: './search-set-add.component.html',
  styleUrls: ['./search-set-add.component.scss']
})
export class SearchSetAddComponent implements OnInit {
  loading = false;
  showModal = false;
  videoSrc = '';

  @ViewChild(ModalComponent) private modalComponent: ModalComponent;

  constructor(
    private alertService: AlertService,
    private router: Router,
    private searchSetAddService: SearchSetAddService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.searchSetAddService.initialize()
      .then(() => {
        this.loading = false;
      })
      .catch(this.handleError);
  }

  onPathClick(path: string) {
    this.videoSrc = path;
    this.modalComponent.open();
  }

  onPerPageSelection(perPageSelectedValue: number) {
    this.searchSetAddService.perPage = perPageSelectedValue;
    this.searchSetAddService.initialize(1);
  }

  onPaginationClick(pageNumber: number): void {
    this.searchSetAddService.initialize(pageNumber);
  }

  onSave() {
    this.loading = true;

    if (this.searchSetAddService.videosInSearchSet.length < 1) {
      return this.handleEmptyVideosValidation();
    }

    this.searchSetAddService.addSearchSet()
      .then((resp) => {
        this.loading = false;
        this.alertService.setAlert(
          `"${this.searchSetAddService.searchSet.name}": has been added.`,
          AlertType.Success
        );
        this.router.navigate(['search-sets']);
      })
      .catch((message: string) => {
        this.alertService.setAlert(message, AlertType.Warning);
        this.loading = false;
      });
  }

  onSelectedSearchSet(): void {
    this.handleSearchEvent();
  }

  onSearchTermUpdated(): void {
    this.handleSearchEvent();
  }

  private handleEmptyVideosValidation() {
    this.alertService.setAlert(`Please add a video to your Search Set before saving it.`, AlertType.Warning);
    this.loading = false;
  }

  private handleSearchEvent(): void {
    this.loading = true;
    if (this.searchSetAddService.selectedSearchSet) {
      this.searchSetAddService.getVideosInSelectedSearchSet(this.searchSetAddService.selectedSearchSet.id)
        .then(() => {
          this.loading = false;
        })
        .catch(this.handleError);
      return;
    }
    this.searchSetAddService.getVideos()
      .then(() => {
        this.loading = false;
      })
      .catch(this.handleError);
  }

  private handleError(): void {
    this.loading = false;
  }
}
