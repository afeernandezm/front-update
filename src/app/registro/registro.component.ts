import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {
    this.nombre = '';
    this.apellidos = '';
    this.fechaNacimiento = new Date();
    /* this.telefono = ''; */
    this.email = '';
    this.contrasenya = '';
  }

  ngOnInit() {}
  cambiarFormulario(): void {
    this.formularioVisible = !this.formularioVisible;
  }
  cambiarFormularioCliente(): void {
    this.formularioVisible = true;
  }

  registrar(): void {
    const url = 'http://localhost:3000/cliente';
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
      formulario.reset();

      localStorage.setItem('cliente', JSON.stringify(data));
      location.reload();
      location.href = '/';
      },
      (error) => {
        console.error(error);

      }
    );
  }

}
