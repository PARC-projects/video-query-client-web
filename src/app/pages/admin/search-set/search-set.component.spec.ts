import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSetComponent } from './search-set.component';

describe('SearchSetComponent', () => {
  let component: SearchSetComponent;
  let fixture: ComponentFixture<SearchSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchSetComponent ]
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
