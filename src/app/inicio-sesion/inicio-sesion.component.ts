import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css'],
})
export class InicioSesionComponent implements OnInit {
  formularioInVisible: boolean = true;
  constructor() {}
  ngOnInit() {}
  cambiarFormularioIn(): void {
    this.formularioInVisible = !this.formularioInVisible;
  }
  cambiarFormularioInCliente(): void {
    this.formularioInVisible = true;
  }
}
