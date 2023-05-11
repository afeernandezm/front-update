import { RutasService } from './../services/rutas.service';
import { Component, OnInit } from '@angular/core';
import { environment } from "../../environments/environtment";
@Component({
  selector: 'app-gimnasios',
  templateUrl: './gimnasios.component.html',
  styleUrls: ['./gimnasios.component.css']
})
export class GimnasiosComponent implements OnInit {
  gimnasios: any[] = [];


  ngOnInit() {
    fetch(environment.URL.gimnasios+'get-gimnasios')
    .then(response => response.json())
    .then(data => {
      this.gimnasios = data;
    })
    .catch(error => console.error(error));
  }
  constructor(private rutasService: RutasService) { }


}
