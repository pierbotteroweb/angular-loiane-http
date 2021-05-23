import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Curso } from './curso';
import { environment } from 'src/environments/environment';
import { tap, delay, take } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly API = `${environment.API}cursos`;

  constructor(private http: HttpClient) { }

  list(){
    return this.http.get<Curso[]>(this.API)
    .pipe(
      delay(2000), //PARA SIMULAR A DEMORA NA RESPOSTA DA REQUEST
      tap(console.log)
    )
  }

  create(curso){
    // USAMOS O TAKE 1 PARA FAZER O UNSUBSCRIBE AUTOMATICO DO OBSERVABLE
    return this.http.post(this.API, curso).pipe(take(1))
  }

  loadById(id){
    // USAMOS O TAKE 1 PARA FAZER O UNSUBSCRIBE AUTOMATICO DO OBSERVABLE
    return this.http.get(`${this.API}/${id}`).pipe(take(1))
  }
}
