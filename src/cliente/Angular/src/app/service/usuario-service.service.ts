import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {

  private apiUrl = 'http://api.usuario.alu6852.arkania.es';

  constructor(private http: HttpClient) { }

  // Obtener todos los usuarios
  getUsuarios() {
    return this.http.get(`${this.apiUrl}`);
  }

  // Registrar un nuevo usuario
  registrarUsuario(nombre: string, email: string, password: string) {
    const body = { nombre, email, password };
    return this.http.post(`${this.apiUrl}`, body);
  }

  // Actualizar un usuario existente
  actualizarUsuario(id: number, nombre: string, email: string, password: string) {
    const body = { nombre, email, password };
    return this.http.put(`${this.apiUrl}`, body);
  }

  // Eliminar un usuario por ID
  eliminarUsuario(id: number) {
    return this.http.delete(`${this.apiUrl}?id_Usuario=`+id);
  }
}
