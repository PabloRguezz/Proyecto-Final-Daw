import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-empresa',
  templateUrl: './header-empresa.component.html',
  styleUrls: ['./header-empresa.component.css']
})
export class HeaderEmpresaComponent {
  constructor(private router: Router){}
  logOut(){
    localStorage.removeItem("token");
    this.router.navigate(['']);
  }
}
