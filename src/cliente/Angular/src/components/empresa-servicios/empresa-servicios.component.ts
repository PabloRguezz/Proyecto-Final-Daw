import { Component } from '@angular/core';
import { Empresa } from 'src/model/empresa/empresa.model';
import { EmpresaHasServiciosService } from 'src/service/empresa_has_servicios/empresa-has-servicios.service';
import { ServiciosService } from 'src/service/servicios/servicios.service';
import jwt_decode from 'jwt-decode';
import { Servicio } from 'src/model/servicio/servicio.model';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empresa-servicios',
  templateUrl: './empresa-servicios.component.html',
  styleUrls: ['./empresa-servicios.component.css']
})
export class EmpresaServiciosComponent {
  constructor(private servicioEmpresa: EmpresaHasServiciosService, private servicio: ServiciosService){
    this.servicios = [];
  }
  nombre:string;
  descripcion:string;
  precio:number;
  servicios: Servicio[];
  
  ngOnInit(){
    this.getServicios();
  }
  eliminarServicio(id_servicio ){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Estas seguro?',
      text: "¿Está seguro de que desea eliminar el servicio?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicio.eliminarServicio(id_servicio).subscribe(
          (servicio) => {
            swalWithBootstrapButtons.fire(
              'Eliminado',
              'Su servicio ha sido eliminado exitosamente',
              'success'
            )
          },
          (error) => {
            swalWithBootstrapButtons.fire(
              'error',
              'Ha habido un problema eliminando su servicio',
              'success'
            )
          }
        )
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })

  }
  editarServicio(id_servicio){
    this.servicio.actualizarServicio(id_servicio,this.precio,this.nombre,this.descripcion).subscribe(
      (servicio) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'El servicio se ha editado correctamente',
          showConfirmButton: false,
          timer: 1500
        })
      }, 
      (error) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ha habido un problema cambiando su servicio',
          showConfirmButton: true,
        })
      }
    )
  }
  getServicios(){
    const token = localStorage.getItem('token');
    const decodedToken: Empresa = jwt_decode(token);
    this.servicioEmpresa.obtenerEmpresaServicioCif(decodedToken["data"].cif_Empresa).subscribe(
      (response) => {
        for (let index = 0; index < response.length; index++) {
          this.servicio.obtenerServicioId(response[index].id_servicio).subscribe(
            (servicio) => {
              this.servicios.push(servicio[0]);
            },
            (error) => {

            }
          )
        }
      },
      (error) => {
      }
    )
  }
}  
