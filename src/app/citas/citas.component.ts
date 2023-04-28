import { ServiceService } from './../services/service.service';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { format } from 'date-fns';


@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {
  gimnasios: any[] = [];
  citas: any[] = [];
  nombre_cliente:string="";
  fecha_cita="";
   /* fecha_formateada = this.fecha_cita.toLocaleDateString('es-ES'); */
  hora_cita:string="";
  nombre_gym:string="";
  /* telefono_cliente:string=""; */
  mostrarModal = false;
  constructor(private http: HttpClient, private servicioService: ServiceService) {
  }

  ngOnInit(): void {
    this.servicioService.getGimnasios()
      .subscribe((response: any[]) => {
        this.gimnasios = response;
      });

      this.servicioService.getCitas()
      ?.subscribe((response: any[]) => {
        this.citas = response;
      });
  }
  abrirModal() {
    this.mostrarModal = true;
  }
  cerrarModal() {
    this.mostrarModal = false;
  }

  isPastDate(dateString: string): boolean {
    const today = new Date();
    const rowDate = new Date(dateString);

    return rowDate.getFullYear() < today.getFullYear() ||
           rowDate.getMonth() < today.getMonth() ||
           rowDate.getDate() < today.getDate();
  }


  registrarCita(): void {
    const url = 'http://localhost:3000/citas';
    const data = {
      nombre_cliente: this.nombre_cliente,
      fecha_cita: this.fecha_cita,
      hora_cita: this.hora_cita,
      nombre_gym: this.nombre_gym,
      /* telefono_cliente: this.telefono_cliente, */
    };
    console.log(data);
    this.http.post(url, data).subscribe(
      (response) => {
        console.log(response);
        const formulario = document.getElementById('citaModal') as HTMLFormElement;
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


  editarCita(): void {
    //falta el id de la cita
    const url = `http://localhost:3000/citas/`;
    const data = {
      fecha_cita: this.fecha_cita,
      hora_cita: this.hora_cita
    };
    console.log(data);
    this.http.put(url, data).subscribe(
      (response) => {
        console.log(response);
        const formulario = document.getElementById('editarCitaModal') as HTMLFormElement;
        const alertSuccess = document.createElement('div');
        alertSuccess.classList.add('alert', 'alert-success');
        alertSuccess.textContent = ("Cita actualizada con éxito");
        formulario.insertBefore(alertSuccess, formulario.firstChild);
        location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  }


}


