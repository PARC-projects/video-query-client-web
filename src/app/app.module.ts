import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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

@NgModule({
  declarations: [
    AppComponent,
    ReferenceTimeValidatorDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatTooltipModule,
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
