import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalificacionesService {

  apiUrl = 'https://api.alu6852.arkania.es/api.php?calificaciones';

  constructor(private http: HttpClient) { }

  obtenerCalificaciones(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=GetAll`, { headers });
  }

  obtenerCalificacionId(id_Calificacion: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=GetId&id_Calificacion=${id_Calificacion}`, { headers });
  }

  obtenerCalificacionServicio(id_servicio: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=GetServicio&id_servicio=${id_servicio}`, { headers });
  }
  agregarCalificacion(nota: number, descripcion: string, id_servicio: number, id_usuario: number, fecha_subida :string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=insert&nota=${nota}&descripcion=${descripcion}&id_servicio=${id_servicio}&id_usuario=${id_usuario}&fecha_subida=${ fecha_subida}`, { headers });
  }

  actualizarCalificacion(id_Calificacion: number, nota: number, descripcion: string, id_servicio: number, id_usuario: number, fecha_subida :string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=update&id_Calificacion=${id_Calificacion}&nota=${nota}&descripcion=${descripcion}&id_servicio=${id_servicio}&id_usuario=${id_usuario}&fecha_subida=${ fecha_subida}`, { headers });
  }

  eliminarCalificacion(id_Calificacion: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=delete&id_Calificacion=${id_Calificacion}`, { headers });
  }

}

