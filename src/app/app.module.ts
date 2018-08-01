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
import { SearchSetAddComponent } from './pages/admin/search-set-add/search-set-add.component';
import { SearchComponent } from './pages/admin/search-set-add/components/search/search.component';
import { CurrentComponent } from './pages/admin/search-set-add/components/current/current.component';

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
import { QuerySelectionComponent } from './pages/existing-query/components/query-selection/query-selection.component';
import { ChartSelectionComponent } from './pages/existing-query/components/chart-selection/chart-selection.component';
import { QueryHeaderComponent } from './pages/existing-query/components/query-header/query-header.component';
import { ReferenceTimeValidatorDirective } from './pages/new-query/reference-time.validator';
import { ComponentsModule } from './components/components.module';
import { RepositoryModule } from './repositories/repository.module';
import { PageModule } from './pages/page.module';


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard] },
  { path: 'new-query', component: NewQueryComponent, canActivate: [AuthenticationGuard] },
  { path: 'existing-query', component: ExistingQueryComponent, canActivate: [AuthenticationGuard] },
  { path: 'help', component: HelpComponent, canActivate: [AuthenticationGuard] },
  { path: 'search-sets', component: SearchSetComponent, canActivate: [AuthenticationGuard] },
  { path: 'search-sets/add', component: SearchSetAddComponent, canActivate: [AuthenticationGuard] },
  { path: '**', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ReferenceTimeValidatorDirective
  ],
  imports: [
    ComponentsModule,
    RepositoryModule,
    PageModule,
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
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
