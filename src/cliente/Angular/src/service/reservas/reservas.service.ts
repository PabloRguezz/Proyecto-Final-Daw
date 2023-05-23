import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  apiUrl = 'https://api.alu6852.arkania.es/api.php?reservas';

  constructor(private http: HttpClient) { }

/**
 * Esta función devuelve un observable que recupera todas las reservas con un token de autorización.
 * @returns Un Observable que realiza una solicitud HTTP GET al extremo de la API especificado por
 * `this.apiUrl` con el sufijo `=GetAll` e incluye un encabezado de autorización con un token de
 * portador recuperado del almacenamiento local. La respuesta de la API se devuelve como resultado del
 * Observable.
 */
  obtenerReservas(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=GetAll`, { headers });
  }

/**
 * Esta función recupera una reserva por su ID mediante una solicitud HTTP GET con encabezados de
 * autorización.
 * @param {number} id_Reserva - El parámetro `id_Reserva` es un número que representa el identificador
 * único de una reserva. Esta función `obtenerReserva` utiliza este parámetro para realizar una
 * solicitud HTTP GET al extremo de la API con el `id_Reserva` especificado para recuperar los detalles
 * de la reserva. Los datos recuperados son
 * @returns La función `obtenerReserva` devuelve un Observable que realiza una solicitud HTTP GET al
 * extremo de la API con el parámetro `id_Reserva` especificado e incluye un encabezado de Autorización
 * con un token de portador recuperado del almacenamiento local. La respuesta de la API se devuelve
 * como un Observable.
 */
  obtenerReserva(id_Reserva: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=GetId&id_Reserva=${id_Reserva}`, { headers });
  }

/**
 * Esta función recupera reservas para un usuario específico usando su ID.
 * @param {number} id_usuario - El parámetro `id_usuario` es un número que representa el identificador
 * único de un usuario. Este método `obtenerReservasUsuario` utiliza este parámetro para recuperar las
 * reservas realizadas por un usuario específico de la API.
 * @returns La función `obtenerReservasUsuario` devuelve un Observable que realiza una solicitud HTTP
 * GET al extremo de la API con el parámetro `id_usuario` especificado e incluye un encabezado de
 * Autorización con un token de portador recuperado del almacenamiento local. La respuesta de la API se
 * devuelve como un Observable.
 */
  obtenerReservasUsuario(id_usuario: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=GetUsuario&id_usuario=${id_usuario}`, { headers });
  }
/**
 * Esta función recupera reservas para un servicio específico mediante una solicitud HTTP GET con
 * encabezados de autorización.
 * @param {number} id_servicio - El parámetro `id_servicio` es un número que representa la
 * identificación de un servicio para el cual se deben recuperar las reservas.
 * @returns Un Observable que realiza una solicitud HTTP GET al extremo de la API con el parámetro
 * id_servicio especificado e incluye un encabezado de Autorización con un token de portador recuperado
 * de localStorage.
 */
  obtenerReservasServicio(id_servicio: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=GetServicio&id_servicio=${id_servicio}`, { headers });
  }

/**
 * Esta función agrega una reserva a un servidor mediante una solicitud HTTP GET con parámetros
 * específicos.
 * @param {string} hora_reserva - Una cadena que representa la hora de la reserva.
 * @param {string} nombre_servicio - El nombre del servicio que se reserva.
 * @param {number} id_servicio - El ID del servicio que se está reservando.
 * @param {number} id_usuario - El DNI del usuario que realiza la reserva.
 * @param {string} dia_reserva - cadena que representa la fecha de la reserva
 * @returns Un Observable que realiza una solicitud HTTP GET al extremo de la API con los parámetros y
 * encabezados especificados. Se espera que el extremo de la API inserte una nueva reserva con los
 * detalles proporcionados.
 */
  agregarReserva(hora_reserva: string, nombre_servicio: string, id_servicio: number, id_usuario: number, dia_reserva:string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=insert&hora_reserva=${hora_reserva}&nombre_servicio=${nombre_servicio}&id_servicio=${id_servicio}&id_usuario=${id_usuario}&dia_reserva=${dia_reserva}`, { headers });
  }

/**
 * Esta función actualiza una reserva con nueva información, como la ID de la reserva, la hora, el
 * nombre del servicio, la ID del servicio, la ID del usuario y la fecha de la reserva.
 * @param {number} id_reserva - El ID de la reserva a actualizar.
 * @param {string} hora_reserva - Es un parámetro de cadena que representa el tiempo de la reserva.
 * @param {string} nombre_servicio - El nombre del servicio que se reserva.
 * @param {number} id_servicio - El ID del servicio que se está reservando.
 * @param {number} id_usuario - El DNI del usuario que realizó la reserva.
 * @param {string} dia_reserva - cadena que representa la fecha de la reserva
 * @returns Un Observable que realiza una solicitud HTTP GET para actualizar una reserva con los
 * parámetros especificados.
 */
  actualizarReserva(id_reserva: number, hora_reserva: string, nombre_servicio: string, id_servicio: number, id_usuario: number,dia_reserva:string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=update&id_reserva=${id_reserva}&hora_reserva=${hora_reserva}&nombre_servicio=${nombre_servicio}&id_servicio=${id_servicio}&id_usuario=${id_usuario}&dia_reserva=${dia_reserva}`, { headers });
  }

/**
 * Esta función envía una solicitud GET para eliminar una reserva con una identificación específica,
 * utilizando un token de autorización en los encabezados.
 * @param {number} id_reserva - El parámetro `id_reserva` es un número que representa el identificador
 * único de una reserva que necesita ser eliminada.
 * @returns Un Observable que envía una solicitud HTTP GET al extremo de la API con el parámetro y los
 * encabezados id_reserva especificados. Se espera que el extremo de la API maneje la eliminación de la
 * reserva con el id_reserva especificado.
 */
  eliminarReserva(id_reserva: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=delete&id_reserva=${id_reserva}`, { headers });
  }

}