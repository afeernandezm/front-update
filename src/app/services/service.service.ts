import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  getGimnasios() {
    return this.http.get<any[]>('http://localhost:3000/gimnasios');
  }
}
