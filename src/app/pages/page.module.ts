import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NewQueryComponent } from './new-query/new-query.component';
import { ResultsListChartComponent } from './home/charts/results-list/results-list-chart.component';
import { ChartOneComponent } from './home/charts/chart-one/chart-one.component';
import { ChartTwoComponent } from './home/charts/chart-two/chart-two.component';
import { ReferenceVideoComponent } from './home/charts/reference-video/reference-video.component';
import { SearchSetComponent } from './admin/search-set/search-set.component';
import { SearchComponent } from './admin/search-set-add/components/search/search.component';
import { CurrentComponent } from './admin/search-set-add/components/current/current.component';
import { SearchSetAddComponent } from './admin/search-set-add/search-set-add.component';
import { ComponentsModule } from '../components/components.module';
import { ChartHeaderComponent } from './home/charts/chart-header/chart-header.component';

/**
 * Login
 */
import { LoginComponent } from './login/login.component';

/**
 * Home
 */
import { HomeComponent } from './home/home.component';
import { QueriesNodeComponent } from './home/components/queries-node/queries-node.component';

/**
 * Query
 */
import { QueryComponent } from './query/query.component';


@NgModule({
  declarations: [
    // Login
    LoginComponent,

    // Home
    HomeComponent,
    QueriesNodeComponent,

    // Query
    QueryComponent,

    NewQueryComponent,
    ResultsListChartComponent,
    ChartOneComponent,
    ChartTwoComponent,
    ReferenceVideoComponent,
    ChartHeaderComponent,
    SearchSetComponent,
    SearchComponent,
    CurrentComponent,
    SearchSetAddComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    MatTooltipModule,
    BrowserAnimationsModule
  ]
})
export class PageModule { }
