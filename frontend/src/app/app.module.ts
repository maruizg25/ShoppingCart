import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ViewProductoComponent } from './components/view-producto/view-producto.component';
import { NavheadComponent } from './components/navhead/navhead.component';
import { MainComponent } from './components/main/main.component';
import { ClientOrderListComponent } from './components/client-order-list/client-order-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavheadComponent,
    ClientOrderListComponent,
    MainComponent,
    LoginComponent,
    RegisterComponent,
    ViewProductoComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
