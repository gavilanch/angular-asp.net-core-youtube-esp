import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Laptop, LaptopCreacion } from './laptop.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LaptopService {

  constructor() { }

  private http = inject(HttpClient);
  private URLbase = environment.apiURL + '/api/laptops';

  public obtenerTodos(): Observable<Laptop[]>{
    return this.http.get<Laptop[]>(this.URLbase);
  }

  public obtenerPorId(id: number): Observable<Laptop>{
    return this.http.get<Laptop>(`${this.URLbase}/${id}`);
  }

  public crear(laptop: LaptopCreacion){
    return this.http.post(this.URLbase, laptop);
  }

  public actualizar(id: number, laptop: LaptopCreacion){
    return this.http.put(`${this.URLbase}/${id}`, laptop);
  }

  public borrar(id: number) {
    return this.http.delete(`${this.URLbase}/${id}`);
  }
}
