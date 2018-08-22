import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { SearchSetComponent } from './search-set.component';
import { ListNavComponent } from '../../../components/list-nav/list-nav.component';
import { ModalComponent } from '../../../components/modal/modal.component';
import { LoaderComponent } from '../../../components/loader/loader.component';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { SearchSetRepository } from '../../../repositories/search-set.repository';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SearchSetComponent', () => {
  let component: SearchSetComponent;
  let fixture: ComponentFixture<SearchSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchSetComponent,
        ListNavComponent,
        ModalComponent,
        LoaderComponent,
        PaginationComponent
      ],
      imports: [
        FormsModule,
        HttpClientTestingModule
      ],
      providers: [
        SearchSetRepository
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
