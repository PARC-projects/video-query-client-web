import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { SearchComponent } from './search.component';
import { PaginationComponent } from '../../../../../components/pagination/pagination.component';
import { AlertService } from '../../../../../services/alert.service';
import { SearchSetRepository } from '../../../../../repositories/search-set.repository';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VideoRepository } from '../../../../../repositories/video.repository';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchComponent,
        PaginationComponent
      ],
      imports: [
        FormsModule,
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
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
