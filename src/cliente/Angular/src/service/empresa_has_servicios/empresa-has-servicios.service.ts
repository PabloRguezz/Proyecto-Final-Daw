import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaHasServiciosService {
  apiUrl = 'https://api.alu6852.arkania.es/api.php?empresa_has_servicios';

  constructor(private http: HttpClient) { }

  obtenerEmpresaServicio(): Observable<any> {

    return this.http.get(`${this.apiUrl}=get_all`);
  }

  obtenerEmpresaServicioCif(cif_Empresa: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=get_by_cif&cif_Empresa=${cif_Empresa}`, { headers });
  }

  obtenerEmpresaServicioService(id_servicio: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=get_by_id_servicio&id_servicio=${id_servicio}`, { headers });
  }

  agregarEmpresaServicio(cif_Empresa: string, id_servicio: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=insert&cif_Empresa=${cif_Empresa}&id_servicio=${id_servicio}`, { headers });
  }

  eliminarEmpresaServicio(cif_Empresa: string, id_servicio: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=delete&cif_Empresa=${cif_Empresa}&id_servicio=${id_servicio}`, { headers });
  }
}

