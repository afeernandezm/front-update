import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
})
export class ContactoComponent {
  constructor(private router: Router) {}

  ngOnInit() {}

  irAPagina(ruta: string) {
    this.router.navigate([ruta]);
  }
}
