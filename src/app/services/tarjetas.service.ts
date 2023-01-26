import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Tarjeta } from '../models/tarjetas.model';

@Injectable({
  providedIn: 'root'
})
export class TarjetasService {

  private apiUrl = `${environment.API_URL}/Tarjeta`;
  constructor(
    private http: HttpClient
  ) { }
  
  saveTarjeta(tarjeta: Tarjeta) {
    return this.http.post<Tarjeta[]>(`${this.apiUrl}`, tarjeta);
  }
  
  listaTarjetas()
  {
    return this.http.get<Tarjeta[]>(`${this.apiUrl}`);
  }

  eliminarTarjetas(id: number)
  {
    return this.http.delete<string>(`${this.apiUrl}`+"?id=" + id);
  }

}
