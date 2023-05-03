import { HttpClient } from '@angular/common/http';
import { ServiceService } from './../services/service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rutinas',
  templateUrl: './rutinas.component.html',
  styleUrls: ['./rutinas.component.css']
})
export class RutinasComponent implements OnInit {
  ejercicios: any[] = [];
  nombre_ejercicio:string="";
  series:number=0;
  repeticiones:number=0;
   clienteString = localStorage.getItem("cliente");
   clienteObjeto = this.clienteString ? JSON.parse(this.clienteString) : null;
  id_cliente = this.clienteObjeto.id_cliente;

  ngOnInit() {
    this.servicioService.getEjercicios()
    ?.subscribe((response: any[]) => {
      this.ejercicios = response;
    });
  }

  constructor(private http: HttpClient, private servicioService: ServiceService){}



  insertarEjercicio(): void {
    const url = 'http://localhost:3000/portalGym/ejercicios';
    const data = {
      nombre_ejercicio: this.nombre_ejercicio,
      series: this.series,
      repeticiones: this.repeticiones,
      id_cliente:this.id_cliente
    };
    console.log(this.id_cliente);
    console.log(data);
    this.http.post(url, data).subscribe(
      (response) => {
        console.log(response);
        const formulario = document.getElementById('modalNuevoEjercicio') as HTMLFormElement;
        const alertSuccess = document.createElement('div');
        alertSuccess.classList.add('alert', 'alert-success');
        alertSuccess.textContent = ("Cita creada con éxito");
        formulario.insertBefore(alertSuccess, formulario.firstChild);
      location.reload();
      },
      (error) => {
        console.error(error);

      }
    );
  }

}
