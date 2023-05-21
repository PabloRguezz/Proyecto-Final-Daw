import { HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Empresa } from 'src/model/empresa/empresa.model';
import { EmpresaService } from 'src/service/empresa/empresa.service';
import { EmpresaHasServiciosService } from 'src/service/empresa_has_servicios/empresa-has-servicios.service';
import jwt_decode from 'jwt-decode';
import { Storage, getDownloadURL, listAll, ref } from '@angular/fire/storage';
import { ReservasService } from 'src/service/reservas/reservas.service';

@Component({
  selector: 'app-home-usuario',
  templateUrl: './home-usuario.component.html',
  styleUrls: ['./home-usuario.component.css']
})
export class HomeUsuarioComponent {
  products:Empresa[] = [];
  cantEmpresas=10;
  reservas ;
  responsiveOptions: any[];
  constructor(private router: Router, private empresa : EmpresaService,private storage : Storage, private reserva : ReservasService){}

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
            this.reservas=response;
            console.log(this.reservas);
            
        }
      )
    }


}

    

