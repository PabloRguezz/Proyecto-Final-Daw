import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {

  apiUrl = 'https://api.alu6852.arkania.es/api.php?user';

  constructor(private http: HttpClient) { }

  obtenerUsuarios(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=GetAll`, { headers });
  }

  obtenerUsuarioEmail(email: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=GetEmail&email=${email}`, { headers });
  }

  obtenerUsuarioId(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=GetId&id=${id}`, { headers });
  }

  agregarUsuario(email: string, password: string, nombre: string): Observable<any> {
    return this.http.get(`${this.apiUrl}=insert&email=${email}&password=${password}&nombre=${nombre}`);
  }

  actualizarUsuario(id: number, email: string, password: string, nombre: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=update&id=${id}&email=${email}&password=${password}&nombre=${nombre}`, { headers });
  }

  eliminarUsuario(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=delete&id=${id}`, { headers });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.get(`${this.apiUrl}=login&email=${email}&password=${password}`);
  }

}
