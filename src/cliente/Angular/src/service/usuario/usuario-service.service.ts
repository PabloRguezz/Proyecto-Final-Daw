import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {

  apiUrl = 'https://api.alu6852.arkania.es/api.php?user';

  constructor(private http: HttpClient) { }

/**
 * Esta función devuelve un observable que recupera todos los usuarios con un token de autorización en
 * los encabezados.
 * @returns Un Observable que realiza una solicitud HTTP GET al extremo de la API especificado por
 * `this.apiUrl` con el sufijo `=GetAll` e incluye un encabezado de autorización con un token de
 * portador recuperado del almacenamiento local. La respuesta de la API se devuelve como resultado del
 * Observable.
 */
  obtenerUsuarios(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=GetAll`, { headers });
  }

/**
 * Esta función recupera la información del usuario en función de su dirección de correo electrónico
 * mediante una solicitud HTTP GET con un token de autorización.
 * @param {string} email - El parámetro de correo electrónico es una cadena que representa la dirección
 * de correo electrónico del usuario que queremos recuperar de la API.
 * @returns Se devuelve un Observable de tipo 'cualquiera'.
 */
  obtenerUsuarioEmail(email: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=GetEmail&email=${email}`, { headers });
  }

/**
 * Esta función recupera la información de un usuario por su ID mediante una solicitud HTTP GET con un
 * token de autorización.
 * @param {number} id - El parámetro `id` es un número que representa el ID de usuario que queremos
 * recuperar de la API.
 * @returns Un Observable que realiza una solicitud HTTP GET al extremo de la API con el ID
 * especificado e incluye un encabezado de Autorización con un token de portador recuperado del
 * almacenamiento local.
 */
  obtenerUsuarioId(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=GetId&id=${id}`, { headers });
  }

/**
 * Esta función agrega un nuevo usuario a la base de datos utilizando su correo electrónico, contraseña
 * y nombre como parámetros.
 * @param {string} email - Una cadena que representa la dirección de correo electrónico del usuario que
 * se agrega.
 * @param {string} password - El parámetro de contraseña es una cadena que representa la contraseña del
 * usuario que se agrega al sistema.
 * @param {string} nombre - El parámetro "nombre" es una cadena que representa el nombre del usuario
 * que se está agregando al sistema.
 * @returns La función `agregarUsuario` está devolviendo un Observable que realiza una solicitud HTTP
 * GET a un punto final de API específico con parámetros de consulta para correo electrónico,
 * contraseña y nombre. La respuesta de la API no se especifica en el fragmento de código.
 */
  agregarUsuario(email: string, password: string, nombre: string): Observable<any> {
    return this.http.get(`${this.apiUrl}=insert&email=${email}&password=${password}&nombre=${nombre}`);
  }

/**
 * Esta función actualiza la información de un usuario mediante una solicitud HTTP GET con el ID, el
 * correo electrónico, la contraseña y el nombre del usuario como parámetros.
 * @param {number} id - Un número que representa el ID del usuario que debe actualizarse.
 * @param {string} email - Una cadena que representa el correo electrónico actualizado del usuario.
 * @param {string} password - El parámetro de contraseña es una cadena que representa la nueva
 * contraseña para la cuenta de usuario que debe actualizarse.
 * @param {string} nombre - El parámetro "nombre" es una cadena que representa el nombre del usuario
 * que necesita ser actualizado en la base de datos.
 * @returns Un Observable que realiza una solicitud HTTP GET para actualizar la información de un
 * usuario con la identificación, el correo electrónico, la contraseña y el nombre especificados. La
 * solicitud incluye un encabezado de Autorización con un token de portador recuperado del
 * almacenamiento local.
 */
  actualizarUsuario(id: number, email: string, password: string, nombre: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=update&id=${id}&email=${email}&password=${password}&nombre=${nombre}`, { headers });
  }

/**
 * Esta función envía una solicitud GET para eliminar un usuario con una ID específica utilizando una
 * URL de API y encabezados de autorización.
 * @param {number} id - El parámetro id es un número que representa el identificador único del usuario
 * que debe eliminarse.
 * @returns Un Observable que envía una solicitud HTTP GET al extremo de la API con el ID especificado
 * para eliminar un usuario e incluye un encabezado de Autorización con un token de portador recuperado
 * del almacenamiento local.
 */
  eliminarUsuario(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=delete&id=${id}`, { headers });
  }

/**
 * Esta función envía una solicitud GET a la API con los parámetros de correo electrónico y contraseña
 * proporcionados para el inicio de sesión del usuario.
 * @param {string} email - Una cadena que representa la dirección de correo electrónico del usuario que
 * intenta iniciar sesión.
 * @param {string} password - Una cadena que representa la contraseña del usuario.
 * @returns Un Observable que realiza una solicitud HTTP GET al extremo de la API para el inicio de
 * sesión del usuario, pasando el correo electrónico y la contraseña como parámetros de consulta.
 */
  login(email: string, password: string): Observable<any> {
    return this.http.get(`${this.apiUrl}=login&email=${email}&password=${password}`);
  }

}
