import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  apiUrl = 'https://api.alu6852.arkania.es?empresa';


  constructor(private http: HttpClient) { }

  registrarEmpresa(empresa): Observable<any> {
    return this.http.get(`${this.apiUrl}=insert`, empresa);
  }

  iniciarSesion(email: string,password : string) {
    return this.http.get(`${this.apiUrl}=GetEmail&email=${email}`);
}

}
