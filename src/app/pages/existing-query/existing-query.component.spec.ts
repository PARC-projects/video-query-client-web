// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { FormsModule } from '@angular/forms';

// import { ExistingQueryComponent } from './existing-query.component';
// import { QuerySelectionComponent } from './components/query-selection/query-selection.component';
// import { ExistingQueryMatchService } from './services/existing-query-match.service';
// import { ExistingQueryService } from './services/existing-query.service';
// import { QueryHeaderComponent } from './components/query-header/query-header.component';
// import { ChartOneComponent } from './charts/chart-one/chart-one.component';
// import { ChartTwoComponent } from './charts/chart-two/chart-two.component';
// import { ResultsListChartComponent } from './charts/results-list/results-list-chart.component';
// import { ReferenceVideoComponent } from './charts/reference-video/reference-video.component';
// import { ChartSelectionComponent } from './components/chart-selection/chart-selection.component';
// import { LoaderComponent } from '../../components/loader/loader.component';
// import { ListNavComponent } from '../../components/list-nav/list-nav.component';
// import { ChartHeaderComponent } from './charts/chart-header/chart-header.component';
// import { PaginationComponent } from '../../components/pagination/pagination.component';
// import { MatTooltipModule } from '@angular/material/tooltip';
// import { QueryRepository } from '../../repositories/query.repository';
// import { VideoRepository } from '../../repositories/video.repository';
// import { SearchSetRepository } from '../../repositories/search-set.repository';
// import { MatchRepository } from '../../repositories/match.repository';
// import { RouterTestingModule } from '@angular/router/testing';
// import { AlertService } from '../../services/alert.service';

// describe('ExistingQueryComponent', () => {
//   let component: ExistingQueryComponent;
//   let fixture: ComponentFixture<ExistingQueryComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         ExistingQueryComponent,
//         QuerySelectionComponent,
//         QueryHeaderComponent,
//         ChartOneComponent,
//         ChartTwoComponent,
//         ResultsListChartComponent,
//         ReferenceVideoComponent,
//         ChartSelectionComponent,
//         LoaderComponent,
//         ListNavComponent,
//         ChartHeaderComponent,
//         PaginationComponent
//       ],
//       providers: [
//         ExistingQueryMatchService,
//         ExistingQueryService,
//         QueryRepository,
//         VideoRepository,
//         SearchSetRepository,
//         MatchRepository,
//         AlertService
//       ],
//       imports: [
//         FormsModule,
//         RouterTestingModule,
//         HttpClientTestingModule,
//         MatTooltipModule
//       ]
//     })
//       .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ExistingQueryComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
