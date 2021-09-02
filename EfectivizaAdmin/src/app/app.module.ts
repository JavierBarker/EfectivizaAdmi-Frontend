import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ClientsComponent } from './components/clients/clients.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LoanComponent } from './components/loan/loan.component';
import { LoansClientComponent } from './components/loans-client/loans-client.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ClientsComponent,
    LoginComponent,
    MainPageComponent,
    LoanComponent,
    LoansClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
