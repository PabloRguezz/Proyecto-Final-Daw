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
  nombre:string;
  email:string;
  password:string;
  constructor(private usuario : UsuarioServiceService){}
  ngOnInit(){
    this.getUsuario();
  }
  getUsuario(){
    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    this.usuario.obtenerUsuarioEmail(decodedToken['data'].email).subscribe({
      next : (data) => {
        this.datosUsuario = data;
        this.nombre=this.datosUsuario[0].nombre;
        this.email=this.datosUsuario[0].email;
      },
      error : (error) => {

      }
    })
  }
  updateUsuario(){
    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    if (this.password.length < 1) {
      this.password=this.datosUsuario[0].password;
    }
    if (this.nombre.length < 1) {
      this.nombre=this.datosUsuario[0].nombre;
    }
    if (this.email.length < 1) {
      this.email=this.datosUsuario[0].email;
    }
    this.usuario.actualizarUsuario(decodedToken['data'].id,this.email,this.password,this.nombre).subscribe({
      next : (data)=> {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se ha registrado correctamente',
          showConfirmButton: false,
          timer: 1500
        })
        this.usuario.login(this.email,this.password)
      }
    })
  }
}
