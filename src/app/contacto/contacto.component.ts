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

  submitForm(event: Event) {
    event.preventDefault();

    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const message = (document.getElementById('message') as HTMLTextAreaElement).value;

    const body = `Nombre: ${name}\nCorreo electrónico: ${email}\nMensaje: ${message}`;

    window.location.href = `mailto:antoniofernandezmarin3@gmail.com?subject=Formulario de contacto&body=${encodeURIComponent(body)}`;
      // Restablecer los valores del formulario
  const form = document.getElementById('contact-form') as HTMLFormElement;
  form.reset();
  }
}
