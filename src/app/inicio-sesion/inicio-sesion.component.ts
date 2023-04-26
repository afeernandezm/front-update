import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css'],
})
export class InicioSesionComponent implements OnInit {
  formularioInVisible: boolean = true;
  usuario: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerSesion();
  }

  cambiarFormularioIn(): void {
    this.formularioInVisible = !this.formularioInVisible;
  }

  cambiarFormularioInCliente(): void {
    this.formularioInVisible = true;
  }



  iniciarSesion(event: Event): void {
   event.preventDefault();
    const form = event.target as HTMLFormElement;
    const email_cliente = (form.querySelector('input[name=email_cliente]') as HTMLInputElement)?.value;
    const contraseña_cliente = (form.querySelector('input[name=contraseña_cliente]') as HTMLInputElement)?.value;

    const data = {
      email_cliente: email_cliente,
      contraseña_cliente: contraseña_cliente,
    };

    this.http.post('http://localhost:3000/iniciar-sesion', data).subscribe(
      (response) => {
        console.log(response);
        this.obtenerSesion();
        /* location.reload(); */
      },
      (error) => {
        console.error(error);
      }
    );
  }
  obtenerSesion() {
    this.http.get<any>('http://localhost:3000/sesion').subscribe(
      (response) => {
        this.usuario = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
