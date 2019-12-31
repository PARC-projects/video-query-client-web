import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { SearchSetAddService } from './services/search-set-add.service';
import { ModalComponent } from '../../../components/modal/modal.component';
import { AlertService, AlertType } from '../../../services/alert.service';
import { ISearchSet } from '../../../models/search-set.model';
import { TokenAuthComponent } from 'src/app/components/token-auth/token-auth.component';
import { Video } from 'src/app/models/video.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-search-set-add',
  templateUrl: './search-set-add.component.html',
  styleUrls: ['./search-set-add.component.scss']
})
export class SearchSetAddComponent implements OnInit {
  loading = false;
  showModal = false;
  videoSrc = '';
  showVideo = false;

  @ViewChild(TokenAuthComponent, { static: true }) private tokenAuthComponent: TokenAuthComponent;
  @ViewChild(ModalComponent, { static: true }) private modalComponent: ModalComponent;

  constructor(
    private alertService: AlertService,
    private router: Router,
    public searchSetAddService: SearchSetAddService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.searchSetAddService.initialize()
      .then(() => {
        this.loading = false;
      })
      .catch(this.handleError);
  }

  onPathClick(video: Video) {
    this.videoSrc = `${environment.fileStoreRoot}${video.path}`;
    this.showVideo = false;
    if (video.external_source) {
      this.videoSrc = `${environment.externalSource.root}${video.path}`;

      if (this.tokenAuthComponent.authToken.toLowerCase() === 'parc') {
        this.modalComponent.open();
        this.showVideo = true;
        return;
      }

      this.tokenAuthComponent.open();

      return;
    }

    this.showVideo = true;
    this.modalComponent.open();
  }

  onTokenAuthSubmit() {
    if (this.tokenAuthComponent.authToken.toLowerCase() === 'parc') {
      this.showVideo = true;
    }
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
      .then((addedSearchSet: ISearchSet) => {
        this.loading = false;
        this.alertService.setAlert(
          `"${addedSearchSet.name}": has been added.`,
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
    this.alertService.setAlert(`Please add a video to your Video Collection before saving it.`, AlertType.Warning);
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
