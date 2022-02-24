import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { BodyComponent } from './body/body.component';
import { RegistroComponent } from './views/producto/registro/registro.component';
import { RegistroClienteComponent } from './views/cliente/registro-cliente/registro-cliente.component';
import { LoginComponent } from './views/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    BodyComponent,
    RegistroComponent,
    RegistroClienteComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({apiKey: "AIzaSyB1uIygznGdX6Ekmu0gILESEyqgaRgIBoc"}),
    RouterModule.forRoot([
      {path: 'producto-register', component: RegistroComponent},
      {path: 'cliente-save', component: RegistroClienteComponent},
      {path: 'login-inicio', component: LoginComponent}
    ]),
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
