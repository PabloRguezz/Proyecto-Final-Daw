import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaHasServiciosService {
  apiUrl = 'https://api.alu6852.arkania.es/api.php?empresa_has_servicios';

  constructor(private http: HttpClient) { }

/**
 * Esta función devuelve un observable que realiza una solicitud HTTP GET a un punto final de API
 * especificado con encabezados de autorización.
 * @returns Un Observable que realiza una solicitud HTTP GET al extremo de la API especificado por
 * `this.apiUrl` con el parámetro de consulta `get_all` e incluye un encabezado de Autorización con un
 * token de portador recuperado del almacenamiento local. La respuesta de la API se devuelve como
 * resultado del Observable.
 */
  obtenerEmpresaServicio(): Observable<any> {
    const headers = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'))
    return this.http.get(`${this.apiUrl}=get_all`, { headers});
    
  }

/**
 * Esta función recupera información sobre los servicios de una empresa en base a su número de CIF.
 * @param {string} cif_Empresa - Es un parámetro de cadena que representa el CIF (código de
 * identificación fiscal) de una empresa. Esta función utiliza este parámetro para realizar una
 * solicitud HTTP GET a un extremo de la API para recuperar información sobre una empresa en función de
 * su CIF.
 * @returns Un Observable que realiza una solicitud HTTP GET al extremo de la API con el CIF (número de
 * identificación fiscal) especificado de una empresa para recuperar información sobre los servicios de
 * la empresa. La solicitud incluye un token de autorización en los encabezados.
 */
  obtenerEmpresaServicioCif(cif_Empresa: string): Observable<any> {
    const headers = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=get_by_cif&cif_Empresa=${cif_Empresa}`, { headers });
  }

/**
 * Esta función devuelve un observable que recupera información sobre el servicio de una empresa en
 * función del ID de servicio proporcionado.
 * @param {number} id_servicio - Número que representa el ID de un servicio.
 * @returns Un Observable que realiza una solicitud HTTP GET al extremo de la API con el parámetro
 * id_servicio especificado e incluye un encabezado de Autorización con un token de portador recuperado
 * de localStorage.
 */
  obtenerEmpresaServicioService(id_servicio: number): Observable<any> {
    const headers = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=get_by_id_servicio&id_servicio=${id_servicio}`, { headers });
  }

/**
 * Esta función agrega un servicio a una empresa usando su CIF e ID de servicio como parámetros.
 * @param {string} cif_Empresa - Una cadena que representa el CIF (código de identificación fiscal) de
 * una empresa.
 * @param {number} id_servicio - El parámetro "id_servicio" es un número que representa el ID de un
 * servicio que se está agregando a una empresa.
 * @returns Se devuelve un Observable de tipo `cualquiera`.
 */
  agregarEmpresaServicio(cif_Empresa: string, id_servicio: number): Observable<any> {
    const headers = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=insert&cif_Empresa=${cif_Empresa}&id_servicio=${id_servicio}`, { headers });
  }

/**
 * Esta función envía una solicitud GET para eliminar un servicio de una empresa utilizando su CIF y su
 * ID de servicio.
 * @param {string} cif_Empresa - una cadena que representa el CIF (código de identificación fiscal) de
 * una empresa.
 * @param {number} id_servicio - El parámetro `id_servicio` es un número que representa el
 * identificador único de un servicio que pertenece a una empresa identificada por su CIF
 * (`cif_Empresa`). Este método `eliminarEmpresaServicio` envía una solicitud GET al extremo de la API
 * con el `cif_Empresa` especificado
 * @returns Se devuelve un Observable de tipo `cualquiera`.
 */
  eliminarEmpresaServicio(cif_Empresa: string, id_servicio: number): Observable<any> {
    const headers = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=delete&cif_Empresa=${cif_Empresa}&id_servicio=${id_servicio}`, { headers });
  }
}
