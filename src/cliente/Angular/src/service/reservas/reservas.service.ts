import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  apiUrl = 'https://api.alu6852.arkania.es/api.php?reservas';

  constructor(private http: HttpClient) { }

  obtenerReservas(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=GetAll`, { headers });
  }

  obtenerReserva(id_Reserva: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=GetId&id_Reserva=${id_Reserva}`, { headers });
  }

  obtenerReservasUsuario(id_usuario: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=GetUsuario&id_usuario=${id_usuario}`, { headers });
  }
  obtenerReservasServicio(id_servicio: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=GetServicio&id_servicio=${id_servicio}`, { headers });
  }

  agregarReserva(hora_reserva: string, nombre_servicio: string, id_servicio: number, id_usuario: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=insert&hora_reserva=${hora_reserva}&nombre_servicio=${nombre_servicio}&id_servicio=${id_servicio}&id_usuario=${id_usuario}`, { headers });
  }

  actualizarReserva(id_reserva: number, hora_reserva: string, nombre_servicio: string, id_servicio: number, id_usuario: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=update&id_reserva=${id_reserva}&hora_reserva=${hora_reserva}&nombre_servicio=${nombre_servicio}&id_servicio=${id_servicio}&id_usuario=${id_usuario}`, { headers });
  }

  eliminarReserva(id_reserva: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=delete&id_reserva=${id_reserva}`, { headers });
  }

}