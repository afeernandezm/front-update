import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  formularioVisible: boolean = true;
  constructor() {}
  ngOnInit() {}
  cambiarFormulario(): void {
    this.formularioVisible = !this.formularioVisible;
  }
  cambiarFormularioCliente(): void {
    this.formularioVisible = true;
  }
}
