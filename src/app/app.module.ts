import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { InicioComponent } from './inicio/inicio.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { ContactoComponent } from './contacto/contacto.component';
import { GimnasiosComponent } from './gimnasios/gimnasios.component';
import { CitasComponent } from './citas/citas.component';
import { RutinasComponent } from './rutinas/rutinas.component';
import { RegistroComponent } from './registro/registro.component';
import { FormsModule } from '@angular/forms';
import { ControlCitasComponent } from './control-citas/control-citas.component';
import { MiGymComponent } from './mi-gym/mi-gym.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ConocenosComponent } from './conocenos/conocenos.component';
import { NuestrosServiciosComponent } from './nuestros-servicios/nuestros-servicios.component';
import { PoliticaPrivacidadComponent } from './politica-privacidad/politica-privacidad.component';
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    InicioComponent,
    InicioSesionComponent,
    ContactoComponent,
    GimnasiosComponent,
    CitasComponent,
    RutinasComponent,
    RegistroComponent,
    ControlCitasComponent,
    MiGymComponent,
    ConocenosComponent,
    NuestrosServiciosComponent,
    PoliticaPrivacidadComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule,FormsModule, BrowserAnimationsModule,MatButtonModule,MatIconModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
