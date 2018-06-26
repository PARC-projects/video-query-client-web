import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MatTooltipModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/**
 * Auth
 */
import { AuthenticationService } from './services/authentication.service';
import { AuthenticationGuard } from './guards/authentication.guard';
import { TokenInterceptor } from './interceptors/token.interceptor';

/**
 * Pages
 */
import { NewQueryComponent } from './pages/new-query/new-query.component';
import { ExistingQueryComponent } from './pages/existing-query/existing-query.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { HelpComponent } from './pages/help/help.component';
import { SearchSetComponent } from './pages/admin/search-set/search-set.component';

/**
 * Repositories
 */
import { SearchSetRepository } from './repositories/search-set.repository';
import { QueryRepository } from './repositories/query.repository';
import { SignatureRepository } from './repositories/signature.repository';
import { VideoRepository } from './repositories/video.repository';
import { UserRepository } from './repositories/user.repository';
import { QueryResultRepository } from './repositories/query-result.repository';
import { MatchRepository } from './repositories/match.repository';

/**
 * Services
 */
import { AlertService } from './services/alert.service';

/**
 * Charts
 */
import { ReferenceVideoComponent } from './pages/existing-query/charts/reference-video/reference-video.component';
import { ChartOneComponent } from './pages/existing-query/charts/chart-one/chart-one.component';
import { ChartTwoComponent } from './pages/existing-query/charts/chart-two/chart-two.component';
import { ResultsListChartComponent } from './pages/existing-query/charts/results-list/results-list-chart.component';
import { ChartHeaderComponent } from './pages/existing-query/charts/chart-header/chart-header.component';

/**
 * Components
 */
import { AlertComponent } from './components/alert/alert.component';
import { LoaderComponent } from './components/loader/loader.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavComponent } from './components/nav/nav.component';
import { HeaderComponent } from './components/header/header.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { QuerySelectionComponent } from './pages/existing-query/components/query-selection/query-selection.component';
import { ChartSelectionComponent } from './pages/existing-query/components/chart-selection/chart-selection.component';
import { QueryHeaderComponent } from './pages/existing-query/components/query-header/query-header.component';
import { ReferenceTimeValidatorDirective } from './pages/new-query/reference-time.validator';
import { ListNavComponent } from './components/list-nav/list-nav.component';
import { SearchSetSearchComponent } from './pages/admin/search-set/components/search-set-search/search-set-search.component';
import { SearchSetCurrentComponent } from './pages/admin/search-set/components/search-set-current/search-set-current.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard] },
  { path: 'new-query', component: NewQueryComponent, canActivate: [AuthenticationGuard] },
  { path: 'existing-query', component: ExistingQueryComponent, canActivate: [AuthenticationGuard] },
  { path: 'help', component: HelpComponent, canActivate: [AuthenticationGuard] },
  { path: 'search-sets', component: SearchSetComponent, canActivate: [AuthenticationGuard] },
  { path: '**', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ReferenceTimeValidatorDirective,
    HomeComponent,
    NewQueryComponent,
    ExistingQueryComponent,
    LoaderComponent,
    HeaderComponent,
    AlertComponent,
    NavComponent,
    FooterComponent,
    ResultsListChartComponent,
    ChartOneComponent,
    ChartTwoComponent,
    ReferenceVideoComponent,
    PaginationComponent,
    QuerySelectionComponent,
    ChartSelectionComponent,
    QueryHeaderComponent,
    ChartHeaderComponent,
    HelpComponent,
    SearchSetComponent,
    ListNavComponent,
    SearchSetSearchComponent,
    SearchSetCurrentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes
    ),
    MatTooltipModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthenticationGuard,
    AuthenticationService,
    AlertService,
    SearchSetRepository,
    QueryRepository,
    QueryResultRepository,
    MatchRepository,
    SignatureRepository,
    VideoRepository,
    UserRepository,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
