import { HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Empresa } from 'src/model/empresa/empresa.model';
import { EmpresaService } from 'src/service/empresa/empresa.service';
import { EmpresaHasServiciosService } from 'src/service/empresa_has_servicios/empresa-has-servicios.service';
import jwt_decode from 'jwt-decode';
import { Storage, getDownloadURL, listAll, ref } from '@angular/fire/storage';
import { ReservasService } from 'src/service/reservas/reservas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-usuario',
  templateUrl: './home-usuario.component.html',
  styleUrls: ['./home-usuario.component.css']
})
export class HomeUsuarioComponent {
  products:Empresa[] = [];
  cantEmpresas=10;
  cancelarReservaText: string = '';
  empresas = [];
  datosEmpresa:Empresa[] = []
  reservas ;
  responsiveOptions: any[];
  constructor(private router: Router, private empresa : EmpresaService,private storage : Storage, private reserva : ReservasService, private empresaServicio : EmpresaHasServiciosService){}

  ngOnInit(){
    this.mostrarEmpresas();
    this.mostrarReservas();
    this.responsiveOptions = [
      {
          breakpoint: '1400px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '1220px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '1100px',
          numVisible: 1,
          numScroll: 1
      }
  ];

  }
  mostrarEmpresas(){
    this.empresa.obtenerEmpresas().subscribe(
      (response) => {
          this.products=response;
      }
    )
  }
    mostrarReservas(){
      const token = localStorage.getItem('token');
      const decodedToken = jwt_decode(token);
      this.reserva.obtenerReservasUsuario(decodedToken["data"].id).subscribe(
        (response) => {
        const reservasActivas = response.filter(reserva => !this.reservaExpirada(reserva));
        this.reservas = reservasActivas;
        console.log(this.reservas);
        
        for (let index = 0; index < this.reservas.length; index++) {
          this.empresaServicio.obtenerEmpresaServicioService(this.reservas[index].id_servicio).subscribe({
            next:data => {
              this.empresas.push(data[0]);
              this.empresa.obtenerEmpresaCif(this.empresas[index].cif_Empresa).subscribe({
                next:data => {
                  this.datosEmpresa.push(data[0]);
                }
              })
            }
          })
          
        }
            
        }
      )
    }


    mostrarTextoCancelarReserva() {
      this.cancelarReservaText = 'Cancelar Reserva';
    }

    ocultarTextoCancelarReserva() {
      this.cancelarReservaText = '';
    }
    reservaExpirada(reserva: any): boolean {
      const fechaActual = new Date();
      const fechaReserva = new Date(reserva.fecha);
      return fechaReserva < fechaActual;
    }
    eliminarReserva(id_reserva:number){
      this.reserva.eliminarReserva(id_reserva).subscribe({
        next:data=>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Reserva eliminada correctamente',
            showConfirmButton: false,
            timer: 1500
          })
          this.mostrarReservas();
        },
        error:error=>{
          Swal.fire({
            icon: 'error',
            title: 'Ha habido un error eliminando la reserva ',
          })
        }
      })
    }
}
  

    

