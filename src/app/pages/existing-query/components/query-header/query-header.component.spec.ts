import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryHeaderComponent } from './query-header.component';

describe('QueryHeaderComponent', () => {
  let component: QueryHeaderComponent;
  let fixture: ComponentFixture<QueryHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
