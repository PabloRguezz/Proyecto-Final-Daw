import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsuarioServiceService } from 'src/app/service/usuario-service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private http: HttpClient,private router: Router,private usuarioService: UsuarioServiceService) {}
  email: string;
  password: string;
  iniciarSesion() {
  this.usuarioService.iniciarSesion(this.email, this.password).subscribe(
    (usuario: any) => {
      if (usuario && usuario.length > 0) {
        this.router.navigate(['usuario']);
      } else {
        Swal.fire('Inicio de sesión fallido');
      }
    },
    (error) => {
      Swal.fire('Inicio de sesión fallido');      
    }
  );
}

}
