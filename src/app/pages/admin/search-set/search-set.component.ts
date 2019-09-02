import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchSetService } from './services/search-set.service';
import { environment } from '../../../../environments/environment';
import { ModalComponent } from '../../../components/modal/modal.component';
import { TokenAuthComponent } from 'src/app/components/token-auth/token-auth.component';

@Component({
  selector: 'app-search-set',
  templateUrl: './search-set.component.html',
  styleUrls: ['./search-set.component.scss']
})
export class SearchSetComponent implements OnInit {
  loading = false;
  showModal = false;
  videoSrc = '';

  private timeout: any;

  @ViewChild(TokenAuthComponent, { static: true }) private tokenAuthComponent: TokenAuthComponent;
  @ViewChild(ModalComponent, { static: true }) private modalComponent: ModalComponent;

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

  onPathClick(path: string, externalSource = false) {
    this.videoSrc = `${environment.fileStoreRoot}${path}`;
    if (externalSource) {
      this.tokenAuthComponent.open();
    }
    this.modalComponent.open();
  }

  private handleError(): void {
    this.loading = false;
  }
}
