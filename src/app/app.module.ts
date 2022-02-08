import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { BodyComponent } from './body/body.component';
import { RegistroComponent } from './views/producto/registro/registro.component';
import { RegistroClienteComponent } from './views/cliente/registro-cliente/registro-cliente.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    BodyComponent,
    RegistroComponent,
    RegistroClienteComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'producto-register', component: RegistroComponent},
      {path: 'cliente-save', component: RegistroClienteComponent}
    ]),
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
