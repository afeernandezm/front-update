import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  private _nombreUsuario: BehaviorSubject<string> = new BehaviorSubject<string>('');

  get nombreUsuario() {
    return this._nombreUsuario.asObservable();
  }

  setNombreUsuario(nombre: string) {
    this._nombreUsuario.next(nombre);
  }
}
