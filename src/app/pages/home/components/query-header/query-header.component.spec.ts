import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';

import { QueryHeaderComponent } from './query-header.component';
import { ChartHeaderComponent } from '../../charts/chart-header/chart-header.component';

describe('QueryHeaderComponent', () => {
  let component: QueryHeaderComponent;
  let fixture: ComponentFixture<QueryHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ChartHeaderComponent,
        QueryHeaderComponent
      ],
      imports: [
        FormsModule,
        MatTooltipModule
      ]
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
