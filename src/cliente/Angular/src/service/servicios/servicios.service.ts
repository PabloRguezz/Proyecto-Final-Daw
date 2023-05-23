import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  apiUrl = 'https://api.alu6852.arkania.es/api.php?servicios';

  constructor(private http: HttpClient) { }

/**
 * Esta función devuelve un observable que realiza una solicitud HTTP GET para recuperar todos los
 * servicios con un token de autorización en el encabezado.
 * @returns Un Observable que realiza una solicitud HTTP GET al extremo de la API especificado por
 * `this.apiUrl` con el parámetro de consulta `=GetAll` e incluye un encabezado de autorización con un
 * token de portador recuperado del almacenamiento local. La respuesta de la API se devuelve como
 * resultado del Observable.
 */
  obtenerServicios(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=GetAll`, { headers });
  }

/**
 * Esta función recupera un servicio por su ID mediante una solicitud HTTP GET con un token de
 * autorización.
 * @param {number} id - El parámetro `id` es un número que representa la ID de un servicio que debe
 * recuperarse de la API.
 * @returns Un Observable que realiza una solicitud HTTP GET al extremo de la API con el ID de servicio
 * especificado e incluye un encabezado de Autorización con un token de portador recuperado del
 * almacenamiento local. La respuesta de la API se devuelve como resultado del Observable.
 */
  obtenerServicioId(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=GetId&id_Servicio=${id}`, { headers });
  }

/**
 * Esta función agrega un nuevo servicio con un precio, nombre y descripción dados a una API mediante
 * una solicitud HTTP GET con encabezados de autorización.
 * @param {number} precio - Un número que representa el precio del servicio.
 * @param {string} nombre - Un parámetro de cadena que representa el nombre del servicio que se
 * agregará.
 * @param {string} descripcion - Un parámetro de cadena que representa la descripción del servicio que
 * se agrega.
 * @returns Se devuelve un Observable de tipo `cualquiera`.
 */
  agregarServicio(precio: number, nombre: string, descripcion: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=insert&precio=${precio}&nombre=${nombre}&descripcion=${descripcion}`, { headers });
  }

/**
 * Esta función actualiza un servicio con un ID, precio, nombre y descripción dados mediante una
 * solicitud HTTP.
 * @param {number} id - El ID del servicio que necesita ser actualizado.
 * @param {number} precio - precio es un parámetro numérico que representa el precio actualizado de un
 * servicio.
 * @param {string} nombre - Una cadena que representa el nombre actualizado del servicio.
 * @param {string} descripcion - El parámetro "descripcion" es una cadena que representa la descripción
 * de un servicio. Se utiliza como parámetro de entrada en el método "actualizarServicio" para
 * actualizar la descripción de un servicio identificado por su parámetro "id".
 * @returns un Observable de cualquier tipo.
 */
  actualizarServicio(id: number, precio: number, nombre: string, descripcion: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=update&id_Servicio=${id}&precio=${precio}&nombre=${nombre}&descripcion=${descripcion}`, { headers });
  }

/**
 * Esta función envía una solicitud GET para eliminar un servicio con una ID específica utilizando una
 * URL de API y encabezados de autorización.
 * @param {number} id - El parámetro id es un número que representa el identificador único del servicio
 * que debe eliminarse.
 * @returns Se devuelve un Observable de tipo `cualquiera`.
 */
  eliminarServicio(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=delete&id_Servicio=${id}`, { headers });
  }

}

