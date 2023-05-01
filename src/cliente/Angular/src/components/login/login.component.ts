import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsuarioServiceService } from 'src/service/usuario/usuario-service.service';
import Swal from 'sweetalert2';
import { EmpresaService } from 'src/service/empresa/empresa.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private http: HttpClient,private router: Router,private usuarioService: UsuarioServiceService, private empresaService : EmpresaService) {}
  email: string;
  password: string;
  iniciarSesion() {
    if (this.email.includes("@")) {
      this.usuarioService.iniciarSesion(this.email, this.password).subscribe(
        (usuario: any) => {
          if (usuario && usuario.length > 0) {
            const token = usuario.token;
            localStorage.setItem('token', token);
            this.router.navigate(['/usuario']);
          } else {
            Swal.fire({
              icon: 'error',
              title: '!Cuidado!',
              text: 'Datos incorrectos',
              footer: '<a href="registro">Desea registrarse?</a>'
            })
          }
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error iniciando sesion',
          })    
        }
      );
    } else {
      this.empresaService.iniciarSesion(this.email,this.password).subscribe(
        (empresa: any) => {
          if (empresa && empresa.length > 0) {
            this.router.navigate(['/empresa']);
          } else {
            Swal.fire({
              icon: 'error',
              title: '!Cuidado!',
              text: 'Datos incorrectos',
              footer: '<a href="registro">Desea registrarse?</a>'
            })
          }
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error iniciando sesion',
          })    
        }
      );
    }
  
}

}
