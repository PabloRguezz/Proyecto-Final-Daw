import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaService } from 'src/service/empresa/empresa.service';

@Component({
  selector: 'app-home-usuario',
  templateUrl: './home-usuario.component.html',
  styleUrls: ['./home-usuario.component.css']
})
export class HomeUsuarioComponent {
  empresas=[]
  constructor(private router: Router, private empresa : EmpresaService){}
  mostrarEmpresas(){
    this.empresa.obtenerEmpresas().subscribe(
      (response) => {
        console.log(response);
      }
    )

  }
  
}
