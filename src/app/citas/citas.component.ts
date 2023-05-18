import { RutasService } from './../services/rutas.service';
import { ServiceService } from './../services/service.service';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { format } from 'date-fns';
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {
  gimnasios: any[] = [];
  citas: any[] = [];
  nombre_cliente:string="";

  id_cliente:number=0;
  fecha_cita="";
  public idCitaSeleccionada: number=0;
   /* fecha_formateada = this.fecha_cita.toLocaleDateString('es-ES'); */
  hora_cita:string="";
  nombre_gym:string="";
  /* telefono_cliente:string=""; */
  mostrarModal = false;
  constructor(private http: HttpClient, private servicioService: ServiceService,private rutasService: RutasService) {
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

      const clienteString = localStorage.getItem('cliente');
      const cliente = clienteString ? JSON.parse(clienteString) : null;
      this.nombre_cliente = cliente && cliente.nombre_cliente ? cliente.nombre_cliente : '';
  }
  abrirModal() {
    this.mostrarModal = true;
  }
  cerrarModal() {
    this.mostrarModal = false;
  }
  seleccionarCita(id_cita: number) {
    this.idCitaSeleccionada = id_cita;
    console.log(id_cita)
  }
  parseDate(dateString: string): Date {
    const parts = dateString.split('-');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }
  isPastDate(dateString: string): boolean {
    const today = new Date();
    const rowDate = new Date(dateString);
    today.setHours(0, 0, 0, 0);
    rowDate.setHours(0, 0, 0, 0);

    return rowDate < today;
  }


  registrarCita(): void {
    const clienteString = localStorage.getItem('cliente');
    const cliente = clienteString ? JSON.parse(clienteString) : null;
    this.id_cliente = cliente && cliente.id_cliente ? cliente.id_cliente : '';


    const url = environment.URL.citas+this.id_cliente;
    const data = {
      nombre_cliente: this.nombre_cliente,
      fecha_cita: this.fecha_cita,
      hora_cita: this.hora_cita,
      nombre_gym: this.nombre_gym,
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
        this.servicioService.getCitas()
      ?.subscribe((response: any[]) => {
        this.citas = response;
      });
      },
      (error) => {
        console.error(error);

      }
    );
  }


  editarCita(): void {

    const url = environment.URL.citas+this.idCitaSeleccionada;

    const data = {
      fecha_cita: this.fecha_cita,
      hora_cita: this.hora_cita
    };
    console.log(data);
    this.http.put(url, data).subscribe(
      (response) => {
        console.log(response);

        const formulario = document.getElementById('editar-cita-modal') as HTMLFormElement;
        const alertSuccess = document.createElement('div');
        alertSuccess.classList.add('alert', 'alert-success');
        alertSuccess.textContent = ("Cita actualizada con éxito");
        formulario.insertBefore(alertSuccess, formulario.firstChild);
        this.servicioService.getCitas()
        ?.subscribe((response: any[]) => {
          this.citas = response;
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }


  borrarCita(): void {
    const url =environment.URL.citas+'borrar-citas/'+this.idCitaSeleccionada;

    this.http.delete(url).subscribe(
      (response) => {
        console.log(response);

        const formulario = document.getElementById('eliminarCitaModal') as HTMLFormElement;
        const alertSuccess = document.createElement('div');
        alertSuccess.classList.add('alert', 'alert-success');
        alertSuccess.textContent = ("Cita eliminada con éxito");
        formulario.insertBefore(alertSuccess, formulario.firstChild);
        this.servicioService.getCitas()
        ?.subscribe((response: any[]) => {
          this.citas = response;
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }


}


