import { RutasService } from './../services/rutas.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environtment';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-mi-gym',
  templateUrl: './mi-gym.component.html',
  styleUrls: ['./mi-gym.component.css']
})
export class MiGymComponent implements OnInit{
  addressControl = new FormControl();
  addressSuggestions: string[] = [];
  gimnasios: any[] = [];

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
    const url = environment.URL.gimnasios+'insertar-gimnasio';
console.log(this.id_responsable)
    const data = {
      nombre_gym: this.nombre_gym,
      email_gym: this.email_gym,
      direccion_gym: this.direccion_gym,
      telefono: this.telefono,
      id_responsable:this.id_responsable
    };
    console.log(data);
    this.http.post(url, data).subscribe(
      (response) => {
        console.log(response);
        const formulario = document.getElementById('miModal') as HTMLFormElement;
        const alertSuccess = document.createElement('div');
        alertSuccess.classList.add('alert', 'alert-success');
        alertSuccess.textContent = ("Gimnasio creada con éxito");
        formulario.insertBefore(alertSuccess, formulario.firstChild);
        this.getMiGym();
      },
      (error) => {
        console.error(error);
        const formulario = document.getElementById('miModal') as HTMLFormElement;
        const alertError = document.createElement('div');
        alertError.classList.add('alert', 'alert-danger');
        alertError.textContent = ("Error al crear gimnasio");
        formulario.insertBefore(alertError, formulario.firstChild);
      }
    );
  }

  onAddressInput() {
    const address = this.addressControl.value;

    this.http
      .get<string[]>(`${environment.URL.direcciones}/geocode?address=${encodeURIComponent(address)}`)
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((suggestions) => {
          this.addressSuggestions = suggestions;
          return [];
        })
      )
      .subscribe();
  }


}
