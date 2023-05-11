import { RutasService } from './../services/rutas.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environtment';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  formularioVisible: boolean = true;

  nombre: string;
  apellidos: string;
  fechaNacimiento: Date;
  /*   telefono: string; */
  email: string;
  contrasenya: string;

  nombreResponsable: string;
  apellidosResponsable: string;
  telefonoResponsable: string;
  emailResponsable: string;
  contrasenyaResponsable: string;

  constructor(private http: HttpClient,private rutasService: RutasService) {
    this.nombre = '';
    this.apellidos = '';
    this.fechaNacimiento = new Date();
    /* this.telefono = ''; */
    this.email = '';
    this.contrasenya = '';
    this.nombreResponsable = '';
    this.apellidosResponsable = '';
    this.telefonoResponsable = '';
    this.emailResponsable = '';
    this.contrasenyaResponsable = '';
  }

  ngOnInit() { }
  cambiarFormulario(): void {
    this.formularioVisible = !this.formularioVisible;
  }
  cambiarFormularioCliente(): void {
    this.formularioVisible = true;
  }

  registrar(): void {
    const url = environment.URL.usuarios+'cliente';
    const data = {
      nombre_cliente: this.nombre,
      apellidos_cliente: this.apellidos,
      email_cliente: this.email,
      fnac_cliente: this.fechaNacimiento,
      contraseña_cliente: this.contrasenya,
    };
    console.log(data);
    this.http.post(url, data).subscribe(
      (response) => {
        console.log(response);
        const formulario = document.getElementById('formularioRegistroCliente') as HTMLFormElement;
        const alertSuccess = document.createElement('div');
        alertSuccess.classList.add('alert', 'alert-success');
        alertSuccess.textContent = ("Registro o inicio de sesión con éxito");
        formulario.insertBefore(alertSuccess, formulario.firstChild);
        formulario.reset();

        localStorage.setItem('cliente', JSON.stringify(response));
        location.reload();
        location.href = '/';
      },
      (error) => {
        console.error(error);

      }
    );
  }


  registrarResponsable(): void {
    const url = environment.URL.usuarios+'admin';
    const data = {
      nombre_responsable: this.nombreResponsable,
      apellidos_responsable: this.apellidosResponsable,
      email_responsable: this.emailResponsable,
      telefono_responsable: this.telefonoResponsable,
      contraseña_responsable: this.contrasenyaResponsable,
    };
    console.log(data);
    this.http.post(url, data).subscribe(
      (response) => {
        console.log(response);
        const formulario = document.getElementById('formularioResponsable') as HTMLFormElement;
        const alertSuccess = document.createElement('div');
        alertSuccess.classList.add('alert', 'alert-success');
        alertSuccess.textContent = ("Registro o inicio de sesión con éxito");
        formulario.insertBefore(alertSuccess, formulario.firstChild);
        formulario.reset();

        localStorage.setItem('responsable', JSON.stringify(response));

        location.reload();
        location.href = '/';
      },
      (error) => {
        console.error(error);
        const formulario = document.getElementById('formularioResponsable') as HTMLFormElement;
        const alertError = document.createElement('div');
        alertError.classList.add('alert', 'alert-danger');
        alertError.textContent = ("Registro o inicio de sesión fallido");
        formulario.insertBefore(alertError, formulario.firstChild);
      }
    );
  }

}
