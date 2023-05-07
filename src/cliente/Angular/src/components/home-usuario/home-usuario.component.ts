import { HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Empresa } from 'src/model/empresa/empresa.model';
import { EmpresaService } from 'src/service/empresa/empresa.service';
import { EmpresaHasServiciosService } from 'src/service/empresa_has_servicios/empresa-has-servicios.service';

@Component({
  selector: 'app-home-usuario',
  templateUrl: './home-usuario.component.html',
  styleUrls: ['./home-usuario.component.css']
})
export class HomeUsuarioComponent {
  empresas
  cantEmpresas=6;
  constructor(private router: Router, private empresa : EmpresaService){}

  ngOnInit(){
    this.mostrarEmpresas();
  }
  mostrarEmpresas(){
    this.empresa.obtenerEmpresas().subscribe(
      (response) => {
         for (let index = 0; index < this.cantEmpresas; index++) {
          this.empresas=response;
         }
      }
    )

  }
  
}
