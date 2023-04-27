import { ServiceService } from './../services/service.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {
  gimnasios: any[] = [];

  constructor(private http: HttpClient, private servicioService: ServiceService) { }

  ngOnInit(): void {
    this.servicioService.getGimnasios()
      .subscribe((response: any[]) => {
        this.gimnasios = response;
      });
  }
}


