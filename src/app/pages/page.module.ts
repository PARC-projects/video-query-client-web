import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ComponentsModule } from '../components/components.module';

/**
 * New
 */
import { NewQueryComponent } from './new-query/new-query.component';
import { CreateNewQueryComponent } from './create-new-query/create-new-query.component';


/**
 * Login
 */
import { LoginComponent } from './login/login.component';

/**
 * Home
 */
import { HomeComponent } from './home/home.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { QueriesNodeComponent } from './home/components/queries-node/queries-node.component';

/**
 * Query
 */
import { QueryComponent } from './query/query.component';
import { MatchVideoComponent } from './query/components/match-video/match-video.component';
import { MaterialModule } from '../material-module';

/**
 * Video Collection
 */
import { SearchSetComponent } from './admin/search-set/search-set.component';
import { SearchComponent } from './admin/search-set-add/components/search/search.component';
import { CurrentComponent } from './admin/search-set-add/components/current/current.component';
import { SearchSetAddComponent } from './admin/search-set-add/search-set-add.component';

import { MyVideoCollectionsComponent } from './video-collections/video-collections.component';
import { VideoCollectionComponent } from './video-collection/video-collection.component';
import { VideoCollectionNewComponent } from './video-collection-new/video-collection-new.component';

@NgModule({
  declarations: [
    // Login
    LoginComponent,

    // Home
    HomeComponent,
    OnboardingComponent,
    QueriesNodeComponent,

    // Query
    QueryComponent,
    MatchVideoComponent,

    // New Query
    NewQueryComponent,
    CreateNewQueryComponent,

    // Search Set
    SearchSetComponent,
    SearchComponent,
    CurrentComponent,
    SearchSetAddComponent,
    MyVideoCollectionsComponent,
    VideoCollectionComponent,
    VideoCollectionNewComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    MaterialModule,
  ]
})
export class PageModule { }
