import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { NewQueryComponent } from './new-query.component';
import { ComponentsModule } from '../../components/components.module';
import { SearchSetRepository } from '../../repositories/search-set.repository';
import { QueryRepository } from '../../repositories/query.repository';
import { AlertService } from '../../services/alert.service';
import { NewQueryService } from './new-query.service';
import { ISearchSetResponse } from '../../models/search-set.model';
import { LoaderComponent } from '../../components/loader/loader.component';

class MockNewQueryService extends NewQueryService {
  init() {
    this.searchSets = {
      results: []
    } as ISearchSetResponse;
    return Promise.resolve();
  }
}

describe('NewQueryComponent', () => {
  let component: NewQueryComponent;
  let loaderComponent: LoaderComponent;
  let fixture: ComponentFixture<NewQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ComponentsModule
      ],
      declarations: [NewQueryComponent],
      providers: [
        AlertService,
        QueryRepository,
        SearchSetRepository
      ]
    })
      .overrideComponent(NewQueryComponent, {
        set: {
          providers: [
            {
              provide: NewQueryService,
              useClass: MockNewQueryService
            }
          ]
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewQueryComponent);
    component = fixture.componentInstance;

    const loaderFixture  = TestBed.createComponent(LoaderComponent);
    loaderComponent = loaderFixture.componentInstance;
    loaderComponent.show = false;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
