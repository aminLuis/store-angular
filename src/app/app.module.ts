import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { BodyComponent } from './body/body.component';
import { RegistroComponent } from './views/producto/registro/registro.component';
import { RegistroClienteComponent } from './views/cliente/registro-cliente/registro-cliente.component';
import { LoginComponent } from './views/login/login.component';
import { InventarioComponent } from './views/inventario/inventario.component';
import { InsumoComponent } from './views/insumo/insumo.component';
import { ProductoInsumoComponent } from './views/producto-insumo/producto-insumo.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    BodyComponent,
    RegistroComponent,
    RegistroClienteComponent,
    LoginComponent,
    InventarioComponent,
    InsumoComponent,
    ProductoInsumoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    NgSelectModule,
    RouterModule.forRoot([
      {path: 'producto-register', component: RegistroComponent},
      {path: 'cliente-save', component: RegistroClienteComponent},
      {path: 'login-inicio', component: LoginComponent},
      {path: 'inventario-registro', component: InventarioComponent},
      {path: 'insumo-registro', component:InsumoComponent},
      {path: 'producto-insumo', component:ProductoInsumoComponent}
    ]),
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
