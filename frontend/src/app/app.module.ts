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
import { ClienteComponent } from './components/cliente/cliente.component';
import { ProductosComponent } from './components/productos/productos.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { NavloginComponent } from './components/navlogin/navlogin.component';
import { HeaderComponent } from './components/header/header.component';
import { CartComponent } from './components/cart/cart.component';
import { FilterPipe } from './shared/filter.pipe';
import { EditarClienteComponent } from './components/editar-cliente/editar-cliente.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    NavheadComponent,
    ClientOrderListComponent,
    MainComponent,
    LoginComponent,
    RegisterComponent,
    ViewProductoComponent,
    ClienteComponent,
    ProductosComponent,
    PedidosComponent,
    NavloginComponent,
    HeaderComponent,
    CartComponent,
    FilterPipe,
    EditarClienteComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
