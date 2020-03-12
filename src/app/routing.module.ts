import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationGuard } from './guards/authentication.guard';

import { NewQueryComponent } from './pages/new-query/new-query.component';
import { HomeComponent } from './pages/home/home.component';
import { OnboardingComponent } from './pages/onboarding/onboarding.component';
import { LoginComponent } from './pages/login/login.component';
import { SearchSetComponent } from './pages/admin/search-set/search-set.component';
import { SearchSetAddComponent } from './pages/admin/search-set-add/search-set-add.component';
import { QueryComponent } from './pages/query/query.component';
import { CreateNewQueryComponent } from './pages/create-new-query/create-new-query.component';

export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard] },
  { path: 'onboarding', component: OnboardingComponent, canActivate: [AuthenticationGuard] },
  { path: 'query/:id', component: QueryComponent, canActivate: [AuthenticationGuard] },
  { path: 'new-query', component: NewQueryComponent, canActivate: [AuthenticationGuard] },
  { path: 'create-new-query', component: CreateNewQueryComponent, canActivate: [AuthenticationGuard] },
  { path: 'search-sets', component: SearchSetComponent, canActivate: [AuthenticationGuard] },
  { path: 'search-sets/add', component: SearchSetAddComponent, canActivate: [AuthenticationGuard] },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
