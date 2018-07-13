import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchSetAddService } from './search-set-add.service';
import { ModalComponent } from '../../../components/modal/modal.component';

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

  constructor(private searchSetAddService: SearchSetAddService) { }

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

  private handleError(): void {
    this.loading = false;
  }
}
