import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  apiUrl = 'https://api.alu6852.arkania.es/api.php?servicios';

  constructor(private http: HttpClient) { }

  obtenerServicios(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=GetAll`, { headers });
  }

  obtenerServicioId(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=GetId&id_Servicio=${id}`, { headers });
  }

  agregarServicio(precio: number, nombre: string, descripcion: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=insert&precio=${precio}&nombre=${nombre}&descripcion=${descripcion}`, { headers });
  }

  actualizarServicio(id: number, precio: number, nombre: string, descripcion: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=update&id_Servicio=${id}&precio=${precio}&nombre=${nombre}&descripcion=${descripcion}`, { headers });
  }

  eliminarServicio(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=delete&id_Servicio=${id}`, { headers });
  }

}

