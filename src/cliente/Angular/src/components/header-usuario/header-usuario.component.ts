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
/**
 * La función elimina el token del almacenamiento local y navega a la página de inicio.
 */
  logOut(){
    localStorage.removeItem("token");
    this.router.navigate(['']);
  }
/**
 * La función "mostrarEmpresas" recupera una lista de empresas a través de una llamada API y la asigna
 * a la variable "listaEmpresas".
 */
  mostrarEmpresas(){
    this.empresa.obtenerEmpresas().subscribe(
      (response) => {
        this.listaEmpresas=response;
      }
    )
  }
/**
 * Esta función busca empresas en función de un nombre dado y recupera sus imágenes.
 */
  async buscarEmpresas() {
    if (this.nombreEmpresa && this.nombreEmpresa.length > 0) {
      this.empresas = this.listaEmpresas.filter((empresa) =>
        empresa.nombre && empresa.nombre.toLowerCase().includes(this.nombreEmpresa.toLowerCase())
      );
      for (let empresa of this.empresas) {
        empresa.images = await this.getImages(empresa.cif_Empresa);
      }
    } else {
      this.empresas = [];
    }
  }

/**
 * Esta función recupera una lista de URL de imágenes de una ubicación de almacenamiento de Firebase en
 * función de una identificación de empresa determinada.
 * @param {string} cif_Empresa - una cadena que representa el CIF (código de identificación fiscal) de
 * una empresa. Esta función recupera una lista de URL de imágenes almacenadas en Firebase Storage en
 * la carpeta "perfil" con el nombre del CIF de la empresa como subcarpeta.
 * @returns Una promesa que se resuelve en una matriz de cadenas que representan las URL de descarga de
 * las imágenes almacenadas en Firebase Storage en la ruta `perfil/`. Si hay un error, se
 * devuelve una matriz vacía.
 */
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
