import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSetCurrentComponent } from './search-set-current.component';

describe('SearchSetCurrentComponent', () => {
  let component: SearchSetCurrentComponent;
  let fixture: ComponentFixture<SearchSetCurrentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchSetCurrentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSetCurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
