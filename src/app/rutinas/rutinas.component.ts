import { PdfService } from './../services/pdf.service';
import { HttpClient } from '@angular/common/http';
import { ServiceService } from './../services/service.service';
import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable, { ThemeType } from 'jspdf-autotable';

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
  public idEjercicioSeleccionado: number=0;
  ngOnInit() {
    this.servicioService.getEjercicios()
    ?.subscribe((response: any[]) => {
      this.ejercicios = response;
    });
  }

  constructor(private http: HttpClient, private servicioService: ServiceService, private pdf: PdfService){}

  seleccionarEjercicio(id_ejercicio: number) {
    this.idEjercicioSeleccionado = id_ejercicio;
    console.log(id_ejercicio)
  }

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
        alertSuccess.textContent = ("Ejercicio creado con éxito");
        formulario.insertBefore(alertSuccess, formulario.firstChild);
        this.servicioService.getEjercicios()
    ?.subscribe((response: any[]) => {
      this.ejercicios = response;
    });
      },
      (error) => {
        console.error(error);

      }
    );
  }



  editarEjercicio(): void {
    const url = `http://localhost:3000/portalGym/ejercicios/${this.idEjercicioSeleccionado}`;

    const data = {
      nombre_ejercicio: this.nombre_ejercicio,
      series: this.series,
      repeticiones: this.repeticiones,
      id_cliente:this.id_cliente
    };
    console.log(data);
    this.http.put(url, data).subscribe(
      (response) => {
        console.log(response);

        const formulario = document.getElementById('modificarEjercicioModal') as HTMLFormElement;
        const alertSuccess = document.createElement('div');
        alertSuccess.classList.add('alert', 'alert-success');
        alertSuccess.textContent = ("Ejercicio actualizado con éxito");
        formulario.insertBefore(alertSuccess, formulario.firstChild);
        this.servicioService.getEjercicios()
        ?.subscribe((response: any[]) => {
          this.ejercicios = response;
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }



  borrarEjercicio(): void {
    const url = `http://localhost:3000/portalGym/borrar-ejercicios/${this.idEjercicioSeleccionado}`;

    this.http.delete(url).subscribe(
      (response) => {
        console.log(response);

        const formulario = document.getElementById('eliminarEjercicioModal') as HTMLFormElement;
        const alertSuccess = document.createElement('div');
        alertSuccess.classList.add('alert', 'alert-success');
        alertSuccess.textContent = ("Cita eliminada con éxito");
        formulario.insertBefore(alertSuccess, formulario.firstChild);
        this.servicioService.getEjercicios()
        ?.subscribe((response: any[]) => {
          this.ejercicios = response;
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }


  generarPDF() {
    this.pdf.generarPDF();
  }

}
