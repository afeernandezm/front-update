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
  public inicioSesionExitoso: boolean = false;




  constructor(private http: HttpClient) {}

  ngOnInit() {

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


    this.http.post('http://localhost:3000/portalGym/iniciar-sesion', data).subscribe(
      (response) => {
        console.log(response);
        const alertSuccess = document.createElement('div');
        alertSuccess.classList.add('alert', 'alert-success');
        alertSuccess.textContent = ("Inicio sesión exitoso");
form.insertBefore(alertSuccess, form.firstChild);
        // Redirigir al usuario a la página de inicio
        setTimeout(() => {
          window.location.href = 'http://localhost:4200';
        }, 2000);

        localStorage.setItem("cliente",JSON.stringify(response))
      },
        /* location.reload(); */
      (error) => {
        console.error(error);
        const alertError = document.createElement('div');
        alertError.classList.add('alert', 'alert-danger');
        alertError.textContent = 'Error al iniciar sesión';
        form.insertBefore(alertError, form.firstChild);
      }
    );
  }


  iniciarSesionAdmin(event2: Event): void {
    event2.preventDefault();
     const form = event2.target as HTMLFormElement;
     const email_responsable = (form.querySelector('input[name=email_responsable]') as HTMLInputElement)?.value;
     const contraseña_responsable = (form.querySelector('input[name=contraseña_responsable]') as HTMLInputElement)?.value;

     const data = {
      email_responsable: email_responsable,
      contraseña_responsable: contraseña_responsable,
     };


     this.http.post('http://localhost:3000/portalGym/iniciar-sesion-admin', data).subscribe(
       (response) => {
         console.log(response);
         const alertSuccess = document.createElement('div');
         alertSuccess.classList.add('alert', 'alert-success');
         alertSuccess.textContent = ("Inicio sesión exitoso");
 form.insertBefore(alertSuccess, form.firstChild);
         // Redirigir al usuario a la página de inicio
         setTimeout(() => {
           window.location.href = 'http://localhost:4200';
         }, 2000);

         localStorage.setItem("responsable",JSON.stringify(response))
       },
         /* location.reload(); */
       (error) => {
         console.error(error);
         const alertError = document.createElement('div');
         alertError.classList.add('alert', 'alert-danger');
         alertError.textContent = 'Error al iniciar sesión';
         form.insertBefore(alertError, form.firstChild);
       }
     );
   }
}
