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
  },
  {
    path: 'rutinas',
    component: RutinasComponent,
  },
  {
    path: 'registro',
    component: RegistroComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
