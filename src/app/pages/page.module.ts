import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NewQueryComponent } from './new-query/new-query.component';
import { ExistingQueryComponent } from './existing-query/existing-query.component';
import { ResultsListChartComponent } from './existing-query/charts/results-list/results-list-chart.component';
import { ChartOneComponent } from './existing-query/charts/chart-one/chart-one.component';
import { ChartTwoComponent } from './existing-query/charts/chart-two/chart-two.component';
import { ReferenceVideoComponent } from './existing-query/charts/reference-video/reference-video.component';
import { QuerySelectionComponent } from './existing-query/components/query-selection/query-selection.component';
import { ChartSelectionComponent } from './existing-query/components/chart-selection/chart-selection.component';
import { QueryHeaderComponent } from './existing-query/components/query-header/query-header.component';
import { ChartHeaderComponent } from './existing-query/charts/chart-header/chart-header.component';
import { SearchSetComponent } from './admin/search-set/search-set.component';
import { SearchComponent } from './admin/search-set-add/components/search/search.component';
import { CurrentComponent } from './admin/search-set-add/components/current/current.component';
import { SearchSetAddComponent } from './admin/search-set-add/search-set-add.component';
import { ComponentsModule } from '../components/components.module';


@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    NewQueryComponent,
    ExistingQueryComponent,
    ResultsListChartComponent,
    ChartOneComponent,
    ChartTwoComponent,
    ReferenceVideoComponent,
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
