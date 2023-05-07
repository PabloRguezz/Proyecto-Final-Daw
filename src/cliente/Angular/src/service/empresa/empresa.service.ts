import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  apiUrl = 'https://api.alu6852.arkania.es/api.php?empresa';

  constructor(private http: HttpClient) { }

  obtenerEmpresas(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=GetAll`, { headers });
  }

  obtenerEmpresaCif(cif_Empresa: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=GetCif&cif_Empresa=${cif_Empresa}`, { headers });
  }

  agregarEmpresa(cif_Empresa: string, nombre: string, tlf_contacto: string, password: string, horario: string, ubicacion: string, descripcion: string): Observable<any> {
    return this.http.get(`${this.apiUrl}=insert&cif_Empresa=${cif_Empresa}&nombre=${nombre}&tlf_contacto=${tlf_contacto}&password=${password}&horario=${horario}&ubicacion=${ubicacion}&descripcion=${descripcion}`);
  }

  actualizarEmpresa(cif_Empresa: string, nombre: string, tlf_contacto: string, password: string, horario: string, ubicacion: string, descripcion: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=update&cif_Empresa=${cif_Empresa}&nombre=${nombre}&tlf_contacto=${tlf_contacto}&password=${password}&horario=${horario}&ubicacion=${ubicacion}&descripcion=${descripcion}`, { headers });
  }

  eliminarEmpresa(cif_Empresa: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=delete&cif_Empresa=${cif_Empresa}`, { headers });
  }

  login(cif_Empresa: string, password: string): Observable<any> {
    return this.http.get(`${this.apiUrl}=login&cif_Empresa=${cif_Empresa}&password=${password}`);
  }

}