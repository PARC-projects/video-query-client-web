import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSetSearchComponent } from './search-set-search.component';

describe('SearchSetSearchComponent', () => {
  let component: SearchSetSearchComponent;
  let fixture: ComponentFixture<SearchSetSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchSetSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSetSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
