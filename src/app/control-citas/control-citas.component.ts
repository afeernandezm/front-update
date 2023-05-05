import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-control-citas',
  templateUrl: './control-citas.component.html',
  styleUrls: ['./control-citas.component.css']
})
export class ControlCitasComponent implements OnInit {

  public idCitaSeleccionada: number = 0;
  citas: any[] = [];

  ngOnInit() {this.getCitas() }

  constructor(private http: HttpClient) { }
  seleccionarCita(id_cita: number) {
    this.idCitaSeleccionada = id_cita;
    console.log(id_cita)
  }

  isPastDate(dateString: string): boolean {
    const today = new Date();
    const rowDate = new Date(dateString);

    return rowDate.getFullYear() < today.getFullYear() ||
      rowDate.getMonth() < today.getMonth() ||
      rowDate.getDate() < today.getDate();
  }


   getCitas() {
    const responsableString = localStorage.getItem('responsable');
    const responsable = responsableString ? JSON.parse(responsableString) : null;

    if (responsable) {
      const id_responsable = responsable.id_responsable.toString();
      console.log('ID del responsable:', id_responsable);
      this.http.get<any[]>(`http://localhost:3000/portalGym/citas-responsable/${id_responsable}`)
        .subscribe(
          (response) => {
            console.log(response);
            this.citas = response;
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      console.log('No se encontró el objeto responsable en el almacenamiento local');
    }
  }


  borrarCita(): void {
    const url = `http://localhost:3000/portalGym//responsable-borrar-cita/${this.idCitaSeleccionada}`;

    this.http.delete(url).subscribe(
      (response) => {
        console.log(response);

        const formulario = document.getElementById('eliminarCitaModal') as HTMLFormElement;
        const alertSuccess = document.createElement('div');
        alertSuccess.classList.add('alert', 'alert-success');
        alertSuccess.textContent = ("Cita eliminada con éxito");
        formulario.insertBefore(alertSuccess, formulario.firstChild);
        this.getCitas()
      },
      (error) => {
        console.error(error);
      }
    );
  }
  }

