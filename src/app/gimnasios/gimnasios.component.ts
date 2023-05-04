import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gimnasios',
  templateUrl: './gimnasios.component.html',
  styleUrls: ['./gimnasios.component.css']
})
export class GimnasiosComponent implements OnInit {
  gimnasios: any[] = [];
  ngOnInit() {
    fetch('http://localhost:3000/portalGym/get-gimnasios')
    .then(response => response.json())
    .then(data => {
      this.gimnasios = data;
    })
    .catch(error => console.error(error));
  }
  constructor() { }


}
