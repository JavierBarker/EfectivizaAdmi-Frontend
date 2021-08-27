import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './components/clients/clients.component';
import { Component1Component } from './components/component1/component1.component';
import { Component2Component } from './components/component2/component2.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [NoAuthGuard]},
  {path: 'homePage', component: HomePageComponent, canActivate: [AuthGuard], children:[
    {path: 'mainPage', component: MainPageComponent},
    { path: 'clients', component: ClientsComponent },
    { path: 'component1', component:  Component1Component},
    { path: 'component2', component: Component2Component },
    { path: '', pathMatch: 'full', redirectTo: 'mainPage' }
  ]},
  {path: '**', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
