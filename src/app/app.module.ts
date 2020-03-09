import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { AuthenticationGuard } from './guards/authentication.guard';
import { ReferenceTimeValidatorDirective } from './pages/new-query/reference-time.validator';

/**
 * Modules
 */
import { ComponentsModule } from './components/components.module';
import { RepositoryModule } from './repositories/repository.module';
import { PageModule } from './pages/page.module';
import { ServiceModule } from './services/service.module';
import { RoutingModule } from './routing.module';
import { MaterialModule } from './material-module';

@NgModule({
  declarations: [
    AppComponent,
    ReferenceTimeValidatorDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    RoutingModule,
    ComponentsModule,
    RepositoryModule,
    PageModule,
    ServiceModule
  ],
  providers: [
    AuthenticationGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
