import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent {
  constructor(private router: Router) {}

  ngOnInit() {}

  irAPagina(ruta: string) {
    this.router.navigate([ruta]);
  }
  esResponsable(): boolean {
    return localStorage.getItem('responsable') !== null;
  }
}
