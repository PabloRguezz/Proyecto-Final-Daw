import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-usuario',
  templateUrl: './header-usuario.component.html',
  styleUrls: ['./header-usuario.component.css']
})
export class HeaderUsuarioComponent {

  constructor(private router : Router){}
  logOut(){
    localStorage.removeItem("token");
  }
}
