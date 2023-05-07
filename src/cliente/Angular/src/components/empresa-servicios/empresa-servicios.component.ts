import { Component } from '@angular/core';
import { Empresa } from 'src/model/empresa/empresa.model';
import { EmpresaHasServiciosService } from 'src/service/empresa_has_servicios/empresa-has-servicios.service';
import { ServiciosService } from 'src/service/servicios/servicios.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-empresa-servicios',
  templateUrl: './empresa-servicios.component.html',
  styleUrls: ['./empresa-servicios.component.css']
})
export class EmpresaServiciosComponent {
  constructor(private servicioEmpresa: EmpresaHasServiciosService, private servicio: ServiciosService){}
  servicios = []
  ngOnInit(){
    this.getServicios();
  }
  getServicios(){
    const token = localStorage.getItem('token');
    const decodedToken: Empresa = jwt_decode(token);
    this.servicioEmpresa.obtenerEmpresaServicio().subscribe(
      (response) => {
        console.log(response)
      },
      (error) => {
        console.log(error)
      }
    )
  }
}
