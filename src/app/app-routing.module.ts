import { PoliticaPrivacidadComponent } from './politica-privacidad/politica-privacidad.component';
import { NuestrosServiciosComponent } from './nuestros-servicios/nuestros-servicios.component';
import { ConocenosComponent } from './conocenos/conocenos.component';
import { AuthGuard } from './AuthGuard';
import { ControlCitasComponent } from './control-citas/control-citas.component';
import { MiGymComponent } from './mi-gym/mi-gym.component';
import { RegistroComponent } from './registro/registro.component';
import { RutinasComponent } from './rutinas/rutinas.component';
import { CitasComponent } from './citas/citas.component';
import { ContactoComponent } from './contacto/contacto.component';
import { GimnasiosComponent } from './gimnasios/gimnasios.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { InicioComponent } from './inicio/inicio.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: InicioComponent,
  },
  {
    path: 'inicioSesion',
    component: InicioSesionComponent,
  },
  {
    path: 'gimnasios',
    component: GimnasiosComponent,
  },
  {
    path: 'contacto',
    component: ContactoComponent,
  },
  {
    path: 'citas',
    component: CitasComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'rutinas',
    component: RutinasComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'registro',
    component: RegistroComponent,
  },
  {
    path: 'mi-gym',
    component: MiGymComponent,
  },
  {
    path: 'registroCitas',
    component: ControlCitasComponent,
  },
  {
    path: 'conocenos',
    component:ConocenosComponent
  },
  {
    path: 'nuestros-servicios',
    component:NuestrosServiciosComponent
  },
  {
    path: 'politica-privacidad',
    component:PoliticaPrivacidadComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
