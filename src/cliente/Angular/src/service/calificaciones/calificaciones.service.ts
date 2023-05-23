import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalificacionesService {

  apiUrl = 'https://api.alu6852.arkania.es/api.php?calificaciones';

  constructor(private http: HttpClient) { }

 /**
  * Esta función recupera todas las calificaciones con un token de autorización.
  * @returns Un Observable que realiza una solicitud HTTP GET al extremo de la API especificado por
  * `this.apiUrl` con el sufijo `=GetAll` e incluye un encabezado de autorización con un token de
  * portador recuperado del almacenamiento local. La respuesta de la API se devuelve como resultado del
  * Observable.
  */
  obtenerCalificaciones(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=GetAll`, { headers });
  }

/**
 * Esta función recupera una calificación específica por su ID de una API mediante un token de
 * autorización.
 * @param {number} id_Calificacion - El parámetro `id_Calificacion` es un número que representa el ID
 * de una "calificación" específica (que podría traducirse como "grado" o "puntuación" en inglés) que
 * la función está tratando de recuperar de una API.
 * @returns Un Observable que realiza una solicitud HTTP GET al extremo de la API con el parámetro
 * id_Calificacion especificado e incluye un encabezado de Autorización con un token de portador
 * recuperado del almacenamiento local. La respuesta de la API se devuelve como resultado del
 * Observable.
 */
  obtenerCalificacionId(id_Calificacion: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=GetId&id_Calificacion=${id_Calificacion}`, { headers });
  }

/**
 * Esta función recupera la calificación de un servicio con una ID determinada mediante una solicitud
 * HTTP GET con encabezados de autorización.
 * @param {number} id_servicio - El parámetro `id_servicio` es un número que representa el
 * identificador único de un servicio. Esta función `obtenerCalificacionServicio` utiliza este
 * parámetro para realizar una solicitud HTTP GET al extremo de la API para recuperar la calificación
 * del servicio con el `id_servicio` especificado. La función devuelve
 * @returns Un Observable que realiza una solicitud HTTP GET al extremo de la API con el parámetro
 * id_servicio especificado e incluye un encabezado de Autorización con un token de portador recuperado
 * de localStorage.
 */
  obtenerCalificacionServicio(id_servicio: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=GetServicio&id_servicio=${id_servicio}`, { headers });
  }
/**
 * Esta función agrega una nueva calificación con una puntuación dada, una descripción, una ID de
 * servicio, una ID de usuario y una fecha de carga en la API mediante una solicitud HTTP GET.
 * @param {number} nota - un número que representa la calificación o puntuación otorgada a un servicio.
 * @param {string} descripcion - Una cadena que describe la calificación o reseña otorgada por el
 * usuario para un servicio en particular.
 * @param {number} id_servicio - El ID del servicio para el que se agrega la calificación.
 * @param {number} id_usuario - El ID del usuario que envía la calificación.
 * @param {string} fecha_subida - Es un parámetro de cadena que representa la fecha en que se
 * cargó/envió la calificación.
 * @returns Un Observable que envía una solicitud HTTP GET al extremo de la API con los parámetros
 * especificados (nota, descripción, id_servicio, id_usuario, fecha_subida) y encabezados (token de
 * autorización).
 */
  agregarCalificacion(nota: number, descripcion: string, id_servicio: number, id_usuario: number, fecha_subida :string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=insert&nota=${nota}&descripcion=${descripcion}&id_servicio=${id_servicio}&id_usuario=${id_usuario}&fecha_subida=${ fecha_subida}`, { headers });
  }

/**
 * Esta función actualiza una calificación con una identificación, nota, descripción, identificación de
 * servicio, identificación de usuario y fecha de carga determinados.
 * @param {number} id_Calificacion - Un número que representa el ID de la calificación que se
 * actualizará.
 * @param {number} nota - La calificación numérica dada por el usuario para un servicio en particular.
 * @param {string} descripcion - Un parámetro de cadena que representa la descripción de la
 * calificación.
 * @param {number} id_servicio - El ID del servicio para el que se actualiza la clasificación.
 * @param {number} id_usuario - El ID del usuario que envió la calificación.
 * @param {string} fecha_subida - Es un parámetro de cadena que representa la fecha en que se
 * cargó/envió la calificación.
 * @returns Se devuelve un Observable de cualquier tipo.
 */
  actualizarCalificacion(id_Calificacion: number, nota: number, descripcion: string, id_servicio: number, id_usuario: number, fecha_subida :string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=update&id_Calificacion=${id_Calificacion}&nota=${nota}&descripcion=${descripcion}&id_servicio=${id_servicio}&id_usuario=${id_usuario}&fecha_subida=${ fecha_subida}`, { headers });
  }

/**
 * Esta función envía una solicitud GET para eliminar una calificación específica utilizando la
 * identificación y el token de autorización proporcionados.
 * @param {number} id_Calificacion - El parámetro `id_Calificacion` es un número que representa el
 * identificador único de una calificación o grado que necesita ser eliminado.
 * @returns Un Observable que envía una solicitud HTTP GET al extremo de la API con el parámetro y los
 * encabezados id_Calificacion especificados. Se espera que el extremo de la API maneje la solicitud y
 * elimine el registro correspondiente de la base de datos. La respuesta de la API no se especifica en
 * el fragmento de código.
 */
  eliminarCalificacion(id_Calificacion: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=delete&id_Calificacion=${id_Calificacion}`, { headers });
  }

}

