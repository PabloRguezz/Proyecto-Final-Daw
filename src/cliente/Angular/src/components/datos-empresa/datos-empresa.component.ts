import { Component } from '@angular/core';
import { getDownloadURL, listAll, ref } from '@angular/fire/storage';
import { Empresa } from 'src/model/empresa/empresa.model';
import jwt_decode from 'jwt-decode';
import { Servicio } from 'src/model/servicio/servicio.model';
import { ServiciosService } from 'src/service/servicios/servicios.service';
import { ActivatedRoute } from '@angular/router';
import { EmpresaHasServiciosService } from 'src/service/empresa_has_servicios/empresa-has-servicios.service';
import { EmpresaService } from 'src/service/empresa/empresa.service';
import { Storage } from '@angular/fire/storage';
import { CalificacionesService } from 'src/service/calificaciones/calificaciones.service';
import { ReservasService } from 'src/service/reservas/reservas.service';
import Swal from 'sweetalert2';
import { UsuarioServiceService } from 'src/service/usuario/usuario-service.service';

@Component({
  selector: 'app-datos-empresa',
  templateUrl: './datos-empresa.component.html',
  styleUrls: ['./datos-empresa.component.css']
})
export class DatosEmpresaComponent {
  servicios: Servicio[] = [];
  noServicios;
  noEmpresa;
  datosEmpresa : Empresa;
  images;
  comentario;
  horarioFinal = [];
  id_servicio;
  calificacion;
  nombre:string;
  descripcion:string;
  precio:number;
  nombreServicio: string;
  calificacionMediaFinal;
  calificacionMedia;
  isLoading: boolean = true;
 showSpinner: boolean = true;

  
  responsiveOptions = [
    {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
    },
    {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
    }
];
  constructor(private servicio: ServiciosService,private reservas: ReservasService, private calificaciones:CalificacionesService, private storage : Storage ,private route: ActivatedRoute,private servicioEmpresa: EmpresaHasServiciosService, private empresa : EmpresaService,private Usuario : UsuarioServiceService){}
  ngOnInit(){
    setTimeout(() => {
      this.showSpinner = false;
    }, 2000);
    this.isLoading = true;
    this.getServicios();
    this.getDatos();
    this.getImages();

  }
  /**
   * Esta función recupera y asigna comentarios y calificaciones de usuarios para un ID de servicio
   * dado, y también recupera y asigna los nombres de usuario correspondientes para cada comentario.
   * @param id - El parámetro "id" es un número o cadena que representa el ID de un servicio para el
   * cual la función está recuperando comentarios o calificaciones.
   */
  getCalificaciones(id): void {
    this.id_servicio = id;
    this.calificaciones.obtenerCalificacionServicio(this.id_servicio).subscribe(
      data => {
        this.comentario = data;
        for (let index = 0; index < this.comentario.length; index++) {
          this.Usuario.obtenerUsuarioId(this.comentario[index].id_usuario).subscribe({
            next: userData => {
              this.comentario[index].nombre_usuario = userData[0].nombre;

            }
          });
        }
      },
      error => {

      }
    );
  }
  

  /**
   * Esta función recupera servicios y sus calificaciones promedio para una empresa específica de una
   * API y los almacena en una matriz.
   */
  getServicios(){
    const token = localStorage.getItem('token');
    const decodedToken: Empresa = jwt_decode(token);
    this.servicioEmpresa.obtenerEmpresaServicioCif(decodedToken["data"].cif_Empresa).subscribe(
      (response) => {
        console.log(response[0].id_servicio);
        if (response.length > 0) {
          for (let index = 0; index < response.length; index++) {
            this.servicio.obtenerServicioId(response[index].id_servicio).subscribe(
              (servicio) => {
                this.servicios.push(servicio[0]);
                this.calificacionMediaFinal = [];
                for (let index = 0; index < this.servicios.length; index++) {
                  this.calificaciones.obtenerCalificacionServicio(this.servicios[index].id_servicio).subscribe({
                    next: data => {
                      this.calificacionMedia = data;
                      const calificacionesServicio = this.calificacionMedia.filter(calificacion => calificacion.id_servicio === this.servicios[index].id_servicio);
                      if (calificacionesServicio.length === 0) {
                        this.calificacionMediaFinal[index] = 0;
                      } else {
                        const totalCalificaciones = calificacionesServicio.length;
                        const sumaCalificaciones = calificacionesServicio.reduce((acumulador, calificacion) => acumulador + calificacion.nota, 0);
                        const mediaCalificaciones = sumaCalificaciones / totalCalificaciones;
                        this.calificacionMediaFinal[index] = Math.round(mediaCalificaciones);
                      }
                    }
                  });
                }
              },
              (error) => {
  
              }
            )
          }
        } 
        
      },
      (error) => {
      }
    )
    this.isLoading = false;
  }
/**
 * La función "addDatos" establece los valores de "id_servicio", "nombre", "descripcion" y "precio" en
 * base a los parámetros de entrada.
 * @param id - El ID del servicio que se está agregando.
 * @param nombre - El parámetro "nombre" es una cadena que representa el nombre de un servicio.
 * @param descripcion - Este parámetro es una cadena que representa la descripción de un servicio.
 * Podría incluir detalles sobre lo que ofrece el servicio, sus características o cualquier otra
 * información relevante.
 * @param precio - precio es un parámetro que representa el precio de un servicio. Es probable que sea
 * un valor numérico que represente el costo del servicio que se ofrece.
 */
  addDatos(id,nombre,descripcion,precio){
    this.id_servicio=id;
    this.nombre=nombre;
    this.descripcion=descripcion;
    this.precio=precio;
  }
  /**
   * Esta función actualiza un servicio y muestra un mensaje de éxito o error usando SweetAlert.
   */
  editar(){
    this.servicio.actualizarServicio(this.id_servicio,this.precio,this.nombre,this.descripcion).subscribe({
      next:data=>{
        for (let index = 0; index < this.servicios.length; index++) {
          if(this.servicios[index].id_servicio==this.id_servicio){
            this.servicios[index].nombre=this.nombre;
            this.servicios[index].descripcion=this.descripcion;
            this.servicios[index].precio=this.precio
          }
        }
        Swal.fire({
          position: 'center',
          icon: 'success',
          title:'Se ha actualizado correctamente'
        })
      },
      error:error=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ha habido un error editando el servicio',
        })
      }
    })
  }
  /**
   * Esta función solicita al usuario que confirme la eliminación de un servicio y luego envía una
   * solicitud para eliminar el servicio del servidor y eliminarlo de la lista local de servicios.
   * @param {number} id_servicio - un número que representa el ID del servicio que se va a eliminar.
   */
  eliminarServicio(id_servicio:number){
    Swal.fire({
      title: '¿Está seguro de que desea eliminar este servicio?',
      text: "No habrá vuelta atrás",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicio.eliminarServicio(id_servicio).subscribe({
          next:data=>{
            for (let index = 0; index < this.servicios.length; index++) {
              if(this.servicios[index].id_servicio==id_servicio){
                this.servicios.splice(index,1);
              }
            }
            Swal.fire(
              'Eliminado',
              'El servicio ha sido eliminado',
              'success'
            )

          },
          error:error=>{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Ha habido un error eliminando el servicio',
            })
          }
        })

      }
    })
  }
  /**
   * Esta función recupera imágenes de una ubicación de almacenamiento de Firebase en función del token
   * decodificado de un usuario.
   */
  getImages(){
    const token = localStorage.getItem('token');
    const decodedToken: Empresa = jwt_decode(token);
    const imagesRef = ref(this.storage,`imagenesEmpresas/${decodedToken["data"].cif_Empresa}`);
    listAll(imagesRef)
    .then(async response => {
      this.images=[];
      for(let item of response.items){
        const url = await getDownloadURL(item);
        this.images.push(url);
      }
    })

    .catch(
      error => console.log(error)
    )
  }
  /**
   * Esta función recupera datos de un token, los usa para obtener información sobre una empresa y
   * formatea el horario de apertura de la empresa en una matriz.
   */
  getDatos(){
    const token = localStorage.getItem('token');
    const decodedToken: Empresa = jwt_decode(token);
    this.empresa.obtenerEmpresaCif(decodedToken["data"].cif_Empresa).subscribe(
      (response) => {
        this.datosEmpresa=response[0];
        let horario = this.datosEmpresa.horario;
        let horarioArray = horario.split(",");
        for (let i = 0; i < horarioArray.length; i++) {
          let info = horarioArray[i].split(" ");
          let dia = info[0];       
          let hora = info[1] === "Cerrado" ? "Cerrado" : info[1] ;
          this.horarioFinal.push({ dia, hora });
        }

      }
    )
  }
}
