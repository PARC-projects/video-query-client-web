import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './login/login.component';
import { NewQueryComponent } from './new-query/new-query.component';
import { ResultsListChartComponent } from './home/charts/results-list/results-list-chart.component';
import { ChartOneComponent } from './home/charts/chart-one/chart-one.component';
import { ChartTwoComponent } from './home/charts/chart-two/chart-two.component';
import { ReferenceVideoComponent } from './home/charts/reference-video/reference-video.component';
import { ChartSelectionComponent } from './home/components/chart-selection/chart-selection.component';
import { SearchSetComponent } from './admin/search-set/search-set.component';
import { SearchComponent } from './admin/search-set-add/components/search/search.component';
import { CurrentComponent } from './admin/search-set-add/components/current/current.component';
import { SearchSetAddComponent } from './admin/search-set-add/search-set-add.component';
import { ComponentsModule } from '../components/components.module';

/**
 * Home
 */
import { HomeComponent } from './home/home.component';
import { QueryComponent } from './home/components/query/query.component';
import { QueryHeaderComponent } from './home/components/query-header/query-header.component';
import { ChartHeaderComponent } from './home/charts/chart-header/chart-header.component';
import { QuerySelectionComponent } from './home/components/query-selection/query-selection.component';


@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    NewQueryComponent,
    ResultsListChartComponent,
    ChartOneComponent,
    ChartTwoComponent,
    ReferenceVideoComponent,
    QueryComponent,
    QuerySelectionComponent,
    ChartSelectionComponent,
    QueryHeaderComponent,
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
