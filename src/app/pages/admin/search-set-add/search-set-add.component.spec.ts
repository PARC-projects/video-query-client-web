import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SearchSetAddComponent } from './search-set-add.component';
import { CurrentComponent } from './components/current/current.component';
import { SearchComponent } from './components/search/search.component';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { ModalComponent } from '../../../components/modal/modal.component';
import { LoaderComponent } from '../../../components/loader/loader.component';
import { AlertService } from '../../../services/alert.service';
import { SearchSetRepository } from '../../../repositories/search-set.repository';
import { VideoRepository } from '../../../repositories/video.repository';

describe('SearchSetAddComponent', () => {
  let component: SearchSetAddComponent;
  let fixture: ComponentFixture<SearchSetAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CurrentComponent,
        SearchComponent,
        SearchSetAddComponent,
        PaginationComponent,
        ModalComponent,
        LoaderComponent
       ],
       imports: [
         FormsModule,
         RouterTestingModule,
         HttpClientTestingModule
       ],
       providers: [
         AlertService,
         SearchSetRepository,
         VideoRepository
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSetAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
