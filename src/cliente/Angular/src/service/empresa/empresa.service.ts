import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  apiUrl = 'https://api.empresa.alu6852.arkania.es';


  constructor(private http: HttpClient) { }

  registrarEmpresa(empresa): Observable<any> {
    return this.http.post(`${this.apiUrl}`, empresa);
  }

  iniciarSesion(email: string, password: string) {
    return this.http.get(`${this.apiUrl}?email=${email}&password=${password}`);
  }
}
