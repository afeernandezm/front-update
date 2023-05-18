import { RutasService } from './../services/rutas.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from "../../environments/environment";
@Component({
  selector: 'app-control-citas',
  templateUrl: './control-citas.component.html',
  styleUrls: ['./control-citas.component.css']
})
export class ControlCitasComponent implements OnInit {

  public idCitaSeleccionada: number = 0;
  citas: any[] = [];

  ngOnInit() {this.getCitas() }

  constructor(private http: HttpClient,private rutasService: RutasService) { }
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


  getCitas() {
    const responsableString = localStorage.getItem('responsable');
    const responsable = responsableString ? JSON.parse(responsableString) : null;
    const spinner = document.querySelector('.spinner') as HTMLElement;
    spinner.style.display = 'block'; // Mostrar el spinner

    if (responsable) {
      const id_responsable = responsable.id_responsable.toString();
      console.log('ID del responsable:', id_responsable);
      this.http.get<any[]>(environment.URL.citas + 'citas-responsable/' + id_responsable)
        .subscribe(
          (response) => {
            console.log(response);
            this.citas = response;
            spinner.style.display = 'none'; // Ocultar el spinner al recibir la respuesta
          },
          (error) => {
            console.log(error);
            spinner.style.display = 'none'; // Ocultar el spinner en caso de error
          }
        );
    } else {
      console.log('No se encontró el objeto responsable en el almacenamiento local');
      spinner.style.display = 'none'; // Ocultar el spinner si no se encuentra el objeto responsable
    }
  }



  borrarCita(): void {
    const url = environment.URL.citas + 'responsable-borrar-cita/' + this.idCitaSeleccionada;
    const spinner = document.querySelector('.spinner') as HTMLElement;
    spinner.style.display = 'block'; // Mostrar el spinner

    this.http.delete(url).subscribe(
      (response) => {
        console.log(response);

        const formulario = document.getElementById('eliminarCitaModal') as HTMLFormElement;
        const alertSuccess = document.createElement('div');
        alertSuccess.classList.add('alert', 'alert-success');
        alertSuccess.textContent = "Cita eliminada con éxito";
        formulario.insertBefore(alertSuccess, formulario.firstChild);
        this.getCitas();
        spinner.style.display = 'none'; // Ocultar el spinner después de obtener la respuesta
      },
      (error) => {
        console.error(error);
        spinner.style.display = 'none'; // Ocultar el spinner en caso de error
      }
    );
  }
  }

