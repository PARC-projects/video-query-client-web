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
    console.log(perPageSelectedValue);
    this.searchSetAddService.perPage = perPageSelectedValue;
    this.searchSetAddService.initialize(1);
  }

  onPaginationClick(pageNumber: number): void {
    this.searchSetAddService.initialize(pageNumber);
  }

  onSave() {
    this.loading = true;
    this.searchSetAddService.addSearchSet()
      .then(() => {
        this.loading = false;
        this.alertService.setAlert(
          `"${this.searchSetAddService.searchSet.name}": has been added.`,
          AlertType.Success
        );
        this.router.navigate(['search-sets']);
      })
      .catch(this.handleError);
  }

  private handleError(): void {
    this.loading = false;
  }
}
