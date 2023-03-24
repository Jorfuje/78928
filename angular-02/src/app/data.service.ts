import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  // salvar saludador
  salvar(saludador:string[]){
    this.http.post<any>('https://jorge-67625-default-rtdb.firebaseio.com/saludador.json',saludador)
    .subscribe(
      response => {console.log ( 'respuesta del servidor' +response.name )},
      error => console.log('error del servidor' +error.error)
    );
  }
}
