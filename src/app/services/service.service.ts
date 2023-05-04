import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  getGimnasios() {
    return this.http.get<any[]>('http://localhost:3000/portalGym/gimnasios');
  }

  getCitas() {
    const clienteString = localStorage.getItem('cliente');
    const cliente = clienteString ? JSON.parse(clienteString) : null;

    if (cliente) {
      const id_cliente = cliente.id_cliente.toString();
      console.log('ID del cliente:', id_cliente);
      return this.http.get<any[]>(`http://localhost:3000/portalGym/get-citas/${id_cliente}`);
    } else {
      console.log('No se encontró el objeto cliente en el almacenamiento local');
      return null; // o devuelve un Observable vacío, dependiendo de lo que necesites en tu aplicación
    }


}


getEjercicios() {
  const clienteString = localStorage.getItem('cliente');
  const cliente = clienteString ? JSON.parse(clienteString) : null;

  if (cliente) {
    const id_cliente = cliente.id_cliente.toString();
    console.log('ID del cliente:', id_cliente);
    return this.http.get<any[]>(`http://localhost:3000/portalGym/get-ejercicios/${id_cliente}`);
  } else {
    console.log('No se encontró el objeto cliente en el almacenamiento local');
    return null;
  }


}





}
