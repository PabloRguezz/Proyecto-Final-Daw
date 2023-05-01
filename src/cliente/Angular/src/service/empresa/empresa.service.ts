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
    return this.http.get(`${this.apiUrl}=insert&nombre=${empresa.nombre}&cif_Empresa=${empresa.cif_Empresa}&tlf_contacto=${empresa.tlf_contacto}&horario=${empresa.horario}&ubicacion=${empresa.ubicacion}&descripcion=${empresa.descripcion}&password=${empresa.password}`);
  }

  iniciarSesion(email: string,password : string) {
    return this.http.get(`${this.apiUrl}=GetEmail&email=${email}&password=${password}`);
}

}
