import { RutasService } from './../services/rutas.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { of } from 'rxjs';
import axios from 'axios';
@Component({
  selector: 'app-mi-gym',
  templateUrl: './mi-gym.component.html',
  styleUrls: ['./mi-gym.component.css']
})
export class MiGymComponent implements OnInit{
  addressControl = new FormControl();
  addressSuggestions: string[] = [];
  gimnasios: any[] = [];
  showAddressSelect: boolean = true;
  nombre_gym:string="";
  email_gym="";
  direccion_gym:string="";
  telefono:string="";
  responsableString = localStorage.getItem("responsable");
  responsableObjeto = this.responsableString ? JSON.parse(this.responsableString) : null;
 id_responsable = this.responsableObjeto.id_responsable;

  ngOnInit() {
this.getMiGym()
  }

  constructor(private http: HttpClient,private rutasService: RutasService){}
  comprobarGimnasio(): boolean {
    return this.gimnasios.length > 0;
  }
  getMiGym() {
    const responsableString = localStorage.getItem('responsable');
    const responsable = responsableString ? JSON.parse(responsableString) : null;

    if (responsable) {
      const id_responsable = responsable.id_responsable.toString();
      console.log('ID del responsable:', id_responsable);
      this.http.get<any[]>(environment.URL.gimnasios+'info-gimnasio/'+id_responsable)
        .subscribe(
          (response) => {
            console.log(response);
            this.gimnasios = response;
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      console.log('No se encontró el objeto responsable en el almacenamiento local');
    }
  }


  registrarGym(): void {
    const url = environment.URL.gimnasios + 'insertar-gimnasio';
    const spinner = document.querySelector('.spinner') as HTMLElement;
    spinner.style.display = 'block'; // Mostrar el spinner

    const data = {
      nombre_gym: this.nombre_gym,
      email_gym: this.email_gym,
      direccion_gym: this.direccion_gym,
      telefono: this.telefono,
      id_responsable: this.id_responsable
    };

    this.http.post(url, data).subscribe(
      (response) => {
        console.log(response);
        spinner.style.display = 'none'; // Ocultar el spinner al recibir la respuesta

        const formulario = document.getElementById('miModal') as HTMLFormElement;
        const alertSuccess = document.createElement('div');
        alertSuccess.classList.add('alert', 'alert-success');
        alertSuccess.textContent = ("Gimnasio creado con éxito");
        formulario.insertBefore(alertSuccess, formulario.firstChild);
        this.getMiGym();
      },
      (error) => {
        console.error(error);
        spinner.style.display = 'none'; // Ocultar el spinner en caso de error

        // Verificar si el error contiene un mensaje personalizado
        let errorMessage = "Error al registrar";
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }

        // Mostrar el mensaje de error en el formulario
        const formulario = document.getElementById('miModal') as HTMLFormElement;
        const alertError = document.createElement('div');
        alertError.classList.add('alert', 'alert-danger');
        alertError.textContent = errorMessage;
        formulario.insertBefore(alertError, formulario.firstChild);
      }
    );
  }

  onAddressInput(event: any) {
    const address = event.target.value;

    if (address) {
      axios
        .get(environment.URL.direcciones+'geocode', { params: { address } })
        .then((response) => {
          const suggestions = response.data.features.map((feature: any) => feature.place_name);
          this.addressSuggestions = suggestions;
          console.log(this.addressSuggestions);
        })
        .catch((error) => {
          console.error('Error en la solicitud de geocodificación:', error);
          this.addressSuggestions = [];
        });
    }
  }

  onAddressSelect(event: any) {
    const selectedAddress = event.target.value;
    this.direccion_gym = selectedAddress;
    this.showAddressSelect = false;
  }
}
