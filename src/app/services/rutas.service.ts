import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RutasService {

  constructor() { }

  URL = {
    citas:"http://localhost:3000/portalGym/citas/",
    ejercicios:"http://localhost:3000/portalGym/ejercicios/",
    gimnasios: "http://localhost:3000/portalGym/gimnasios/",
    usuarios:"http://localhost:3000/portalGym/usuarios/"
  }
/*   URL = {
    citas:"https://backend-portalgym.onrender.com/portalGym/citas/",
    ejercicios:"https://backend-portalgym.onrender.com/portalGym/ejercicios/",
    gimnasios: "https://backend-portalgym.onrender.com/portalGym/gimnasios/",
    usuarios:"https://backend-portalgym.onrender.com/portalGym/usuarios/"
  } */
  location="http://localhost:4200"
}
