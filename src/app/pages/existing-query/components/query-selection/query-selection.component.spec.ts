import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuerySelectionComponent } from './query-selection.component';

describe('QuerySelectionComponent', () => {
  let component: QuerySelectionComponent;
  let fixture: ComponentFixture<QuerySelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuerySelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuerySelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
