import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PersonasModel } from '../models/personas.model';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  private url = 'http://localhost:3000/personas/';

  constructor(private http: HttpClient) { }

  consultaPersonas(): Observable<PersonasModel[]> {
    return this.http.get<PersonasModel[]>(this.url);
  }

  consultarUsuario(idConsultar: string): Observable<any> {
    return this.http.get<PersonasModel>(this.url + idConsultar);
  }

  guardarUsuario(datosUsuario: PersonasModel): Observable<PersonasModel> {
    return this.http.post<PersonasModel>(this.url, datosUsuario);
  }

  actualizarUsuario(datosUsuario: PersonasModel): Observable<PersonasModel> {
    return this.http.put<PersonasModel>(this.url + datosUsuario.id, datosUsuario);
  }

  eliminarUsuario(idEliminar: string): Observable<PersonasModel> {
    return this.http.delete<PersonasModel>(`${this.url}${idEliminar}`);
  }
}
