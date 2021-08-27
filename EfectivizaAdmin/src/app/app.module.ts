import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ClientsComponent } from './components/clients/clients.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Component1Component } from './components/component1/component1.component';
import { Component2Component } from './components/component2/component2.component';
import { MainPageComponent } from './components/main-page/main-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ClientsComponent,
    LoginComponent,
    Component1Component,
    Component2Component,
    MainPageComponent
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
