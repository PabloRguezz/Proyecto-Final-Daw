import { Component } from '@angular/core';
import { getDownloadURL, listAll, ref, uploadBytes } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { Empresa } from 'src/model/empresa/empresa.model';
import { EmpresaService } from 'src/service/empresa/empresa.service';
import { Storage } from '@angular/fire/storage';
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header-usuario',
  templateUrl: './header-usuario.component.html',
  styleUrls: ['./header-usuario.component.css']
})
export class HeaderUsuarioComponent {
  empresas=[];
  images;
  listaEmpresas: Empresa[] = []; // Inicializar la variable listaEmpresas con un arreglo vacío
  nombreEmpresa:string;
  constructor(private router : Router,private empresa:EmpresaService, private storage : Storage ){}
  ngOnInit(){
    this.mostrarEmpresas();
  }
  logOut(){
    localStorage.removeItem("token");
    this.router.navigate(['']);
  }
  mostrarEmpresas(){
    this.empresa.obtenerEmpresas().subscribe(
      (response) => {
        this.listaEmpresas=response;
      }
    )
  }
  async buscarEmpresas() {
    if (this.nombreEmpresa && this.nombreEmpresa.length > 0) {
      this.empresas = this.listaEmpresas.filter((empresa) =>
        empresa.nombre && empresa.nombre.toLowerCase().includes(this.nombreEmpresa.toLowerCase())
      );
  
      // Fetch images for each empresa
      for (let empresa of this.empresas) {
        empresa.images = await this.getImages(empresa.cif_Empresa);
      }
    } else {
      this.empresas = [];
    }
  }

  getImages(cif_Empresa: string): Promise<string[]> {
    const imagesRef = ref(this.storage, `perfil/${cif_Empresa}`);
    
    return listAll(imagesRef)
      .then(async (response) => {
        const images: string[] = [];
  
        for (let item of response.items) {
          const url = await getDownloadURL(item);
          images.push(url);
        }
  
        return images;
      })
      .catch((error) => {
        console.log(error);
        return []; 
      });
  }
  
}
