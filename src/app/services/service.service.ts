import { RutasService } from './rutas.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient,private rutasService: RutasService) { }

  getGimnasios() {
    return this.http.get<any[]>(environment.URL.gimnasios);
  }

  getCitas() {
    const clienteString = localStorage.getItem('cliente');
    const cliente = clienteString ? JSON.parse(clienteString) : null;
    const spinner = document.querySelector('.spinner') as HTMLElement;
    spinner.style.display = 'block'; // Mostrar el spinner

    if (cliente) {
      const id_cliente = cliente.id_cliente ? cliente.id_cliente : '';
      console.log('ID del cliente:', id_cliente);
      return this.http.get<any[]>(environment.URL.citas + 'get-citas/' + id_cliente)
        .pipe(
          finalize(() => {
            spinner.style.display = 'none'; // Ocultar el spinner al recibir la respuesta o en caso de error
          })
        );
    } else {
      console.log('No se encontró el objeto cliente en el almacenamiento local');
      spinner.style.display = 'none'; // Ocultar el spinner si no se encuentra el objeto cliente
      return null; // o devuelve un Observable vacío, dependiendo de lo que necesites en tu aplicación
    }
  }



getEjercicios() {
  const clienteString = localStorage.getItem('cliente');
  const cliente = clienteString ? JSON.parse(clienteString) : null;
  const spinner = document.querySelector('.spinner') as HTMLElement;
  spinner.style.display = 'block'; // Mostrar el spinner

  if (cliente) {
    const id_cliente = cliente.id_cliente.toString();
    console.log('ID del cliente:', id_cliente);
    return this.http.get<any[]>(environment.URL.ejercicios + 'get-ejercicios/' + id_cliente)
      .pipe(
        finalize(() => {
          spinner.style.display = 'none'; // Ocultar el spinner al recibir la respuesta o en caso de error
        })
      );
  } else {
    console.log('No se encontró el objeto cliente en el almacenamiento local');
    spinner.style.display = 'none'; // Ocultar el spinner si no se encuentra el objeto cliente
    return null;
  }
}






  }
