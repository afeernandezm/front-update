import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable, { ThemeType } from 'jspdf-autotable';
@Injectable({
  providedIn: 'root'
})
export class PdfService {
  nombre_cliente: any;

  constructor() { }
  public generarPDF(): void {
    // Obtener la tabla original
    const tablaOriginal = document.getElementById('tablaRutinas') as HTMLTableElement;

    // Crear un nuevo elemento de tabla que contendrá solamente las columnas deseadas
    const tablaNueva = document.createElement('table');

    // Crear la fila de encabezado para la nueva tabla
    const filaEncabezado = tablaNueva.insertRow();
    const celdaEjercicio = filaEncabezado.insertCell();
    const celdaSeries = filaEncabezado.insertCell();
    const celdaRepeticiones = filaEncabezado.insertCell();

    // Agregar el contenido de las celdas de encabezado
    celdaEjercicio.innerHTML = 'Ejercicio';
    celdaSeries.innerHTML = 'Series';
    celdaRepeticiones.innerHTML = 'Repeticiones';
    type UserOptions = {
      theme?: ThemeType;
      styles?: any;
      html?: HTMLTableElement | string;
    };
    // Agregar las filas de la tabla original a la nueva tabla
    const filasOriginales = tablaOriginal.tBodies[0].rows;
    for (let i = 0; i < filasOriginales.length; i++) {
      const filaOriginal = filasOriginales[i];

      // Crear una nueva fila en la tabla nueva
      const filaNueva = tablaNueva.insertRow();

      // Agregar las celdas de la fila nueva y asignarles el contenido correspondiente
      const celdaEjercicioNueva = filaNueva.insertCell();
      celdaEjercicioNueva.innerHTML = filaOriginal.cells[0].innerHTML;

      const celdaSeriesNueva = filaNueva.insertCell();
      celdaSeriesNueva.innerHTML = filaOriginal.cells[1].innerHTML;

      const celdaRepeticionesNueva = filaNueva.insertCell();
      celdaRepeticionesNueva.innerHTML = filaOriginal.cells[2].innerHTML;
    }

    // Configurar el PDF
    const doc = new jsPDF();
    const options :UserOptions=  {

      styles: {
        cellPadding: 3,
        fontSize: 10,
        valign: 'middle',
        overflow: 'linebreak',
        tableWidth: 'wrap',
        tableLineColor: [0, 0, 0],
        tableLineWidth: 0.2,
        headStyles: {
          fillColor: [41, 41, 41],
          textColor: [255, 255, 255]
        }
      },
    };
    const clienteString = localStorage.getItem('cliente');
    const cliente = clienteString ? JSON.parse(clienteString) : null;
    this.nombre_cliente = cliente && cliente.nombre_cliente ? cliente.nombre_cliente : '';
    const fecha = new Date().toLocaleDateString();
    const header = `TABLA DE RUTINAS \n\n`;
    const footer = `Generado el ${fecha} en PortalGym por ${this.nombre_cliente}`;

    autoTable(doc, { html: tablaNueva, ...options });

    doc.text(footer, 14, doc.internal.pageSize.height - 15);
    // Agregar encabezado y texto debajo de la tabla
    doc.text(header, 14, 12);
    doc.text('', 0, 25); // Agrega un salto de línea
    doc.text('', 0, 25); // Agrega un salto de línea

    doc.text('', 0, 10); // Agrega 10 unidades de espacio

    // Crear el PDF

    // Descargar el archivo
    doc.save('rutina.pdf');
  }
}
