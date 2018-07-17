import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchSetService } from './services/search-set.service';
import { environment } from '../../../../environments/environment';
import { ModalComponent } from '../../../components/modal/modal.component';

@Component({
  selector: 'app-search-set',
  templateUrl: './search-set.component.html',
  styleUrls: ['./search-set.component.scss']
})
export class SearchSetComponent implements OnInit {
  loading = false;
  showModal = false;
  videoSrc = '';

  private timeout: NodeJS.Timer;

  @ViewChild(ModalComponent) private modalComponent: ModalComponent;

  constructor(public searchSetService: SearchSetService) { }

  ngOnInit() {
    this.loading = true;
    this.searchSetService.initialize()
      .then(() => {
        this.loading = false;
      })
      .catch(this.handleError);
  }

  onSearch(searchTerm: string) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.searchSetService.searchTerm = searchTerm;
      this.searchSetService.initialize(1);
    }, 500);
  }

  onPerPageSelection(perPageSelectedValue: number) {
    this.searchSetService.perPage = perPageSelectedValue;
    this.searchSetService.initialize(1);
  }

  onPaginationClick(pageNumber: number): void {
    this.searchSetService.initialize(pageNumber);
  }

  onSelected(id: number) {
    this.loading = true;
    this.searchSetService.getById(id)
      .then(() => {
        this.loading = false;
      })
      .catch(this.handleError);
  }

  onPathClick(path: string) {
    this.videoSrc = `${environment.fileStoreRoot}${path}`;
    this.modalComponent.open();
  }

  private handleError(): void {
    this.loading = false;
  }
}
