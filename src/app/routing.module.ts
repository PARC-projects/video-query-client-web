import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewQueryComponent } from './pages/new-query/new-query.component';
import { ExistingQueryComponent } from './pages/existing-query/existing-query.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { HelpComponent } from './pages/help/help.component';
import { SearchSetComponent } from './pages/admin/search-set/search-set.component';
import { SearchSetAddComponent } from './pages/admin/search-set-add/search-set-add.component';
import { AuthenticationGuard } from './guards/authentication.guard';

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
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
