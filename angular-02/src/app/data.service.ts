import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

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

  // mostrar saludador
  /*
  mostrarSaludador(){
    this.http.get('https://jorge-67625-default-rtdb.firebaseio.com/saludador.json').pipe(
      map( (responseData: any) => {
        const items = [];
        for (const key in responseData){
          if (responseData.hasOwnProperty(key)){
            items.push({id: key, ...responseData[key] });
          }
        }
        return items;
      })
    ).subscribe(items => {console.log(items); });
  }*/
  mostrarSaludador(): Observable<any[]>{
    return this.http.get('https://jorge-67625-default-rtdb.firebaseio.com/saludador.json').pipe(
      map( (responseData: any) => {
        const items = [];
        for (const key in responseData){
          if (responseData.hasOwnProperty(key)){
            items.push({id: key, ...responseData[key] });
          }
        }
        return items;
      })
    )/*.subscribe(items => {console.log(items); });*/
}
}
