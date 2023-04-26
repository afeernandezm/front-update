import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {

  nombreUsuario: string | null = null;
  constructor(private router: Router) {}

  ngOnInit() {
    const usuario = JSON.parse(localStorage.getItem('cliente') || '{}');
    if (usuario && usuario.nombre_cliente) {
      this.nombreUsuario = usuario.nombre_cliente;
      console.log(this.nombreUsuario)
    } else {
      console.log("No hay usuarios registrados");
    }

    const clienteNombre = JSON.parse(localStorage.getItem('nombre_cliente') || '{}');
    if (clienteNombre && clienteNombre.nombre_cliente) {
      this.nombreUsuario = clienteNombre.nombre_cliente;
      console.log(this.nombreUsuario)
    } else {
      console.log("No hay usuarios registrados");
    }
  }

  irAPagina(ruta: string) {
    this.router.navigate([ruta]);
  }

  cerrarSesion(): void {
    localStorage.removeItem('cliente');
    this.nombreUsuario = null;
    this.router.navigateByUrl('/inicioSesion');
  }
}
