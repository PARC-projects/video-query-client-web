import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsListChartComponent } from './results-list-chart.component';

describe('ResultsListComponent', () => {
  let component: ResultsListChartComponent;
  let fixture: ComponentFixture<ResultsListChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultsListChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsListChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
