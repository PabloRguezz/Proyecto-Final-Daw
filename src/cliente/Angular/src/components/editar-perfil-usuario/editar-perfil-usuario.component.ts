import { Component } from '@angular/core';
import { UsuarioServiceService } from 'src/service/usuario/usuario-service.service';
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-perfil-usuario',
  templateUrl: './editar-perfil-usuario.component.html',
  styleUrls: ['./editar-perfil-usuario.component.css']
})
export class EditarPerfilUsuarioComponent {
  datosUsuario;
  id_usuario:number;
  nombre:string="";
  email:string="";
  password:string="";
  constructor(private usuario : UsuarioServiceService){}
  ngOnInit(){
    this.getUsuario();
  }
  getUsuario(){
    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    this.id_usuario=decodedToken['data'].id;
    this.usuario.obtenerUsuarioEmail(decodedToken['data'].email).subscribe({
      next : (data) => {
        this.datosUsuario = data;
        this.nombre=this.datosUsuario[0].nombre;
        this.email=this.datosUsuario[0].email;
      },
      error : (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Obteniendo los datos del usuario',
        })   
      }
    })
  }
  updateUsuario(){
    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    console.log(this.datosUsuario);
    if (this.password.length < 1) {
      this.password=this.datosUsuario[0].password;
    }
    if (this.nombre.length < 1) {
      this.nombre=this.datosUsuario[0].nombre;
    }
    if (this.email.length < 1) {
      this.email=this.datosUsuario[0].email;
    }
    console.log(this.email);
    console.log(this.nombre);
    console.log(this.password);
    
    this.usuario.actualizarUsuario(this.id_usuario,this.email,this.password,this.nombre).subscribe({
      next:data=> {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se han actualizado los datos correctamente',
          showConfirmButton: false,
          timer: 1500
        })
        this.password="";
        localStorage.setItem('token',data.token)
      }, 
      error:error=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error actualizando el usuario',
        })   
      }
    })
  }
  obtenerNombre(nombre:string){
    return nombre[0];
  }
}
