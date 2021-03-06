import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './components/clients/clients.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoansClientComponent } from './components/loans-client/loans-client.component';
import { LoginComponent } from './components/login/login.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [NoAuthGuard]},
  {path: 'homePage', component: HomePageComponent, canActivate: [AuthGuard], children:[
    {path: 'mainPage', component: MainPageComponent},
    { path: 'clients', component: ClientsComponent },
    { path: 'loansClient/:id', component: LoansClientComponent },
    { path: '', pathMatch: 'full', redirectTo: 'mainPage' }
  ]},
  {path:'notFound', component: NotFoundComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
