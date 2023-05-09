import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { Empresa } from 'src/model/empresa/empresa.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private router : Router){}
  canActivate(): boolean{
    const token = localStorage.getItem('token');
    const decodedToken: Empresa = jwt_decode(token);
    const decodedTokenUser = jwt_decode(token);
    if (decodedToken["data"].cif_Empresa!=undefined || decodedTokenUser["data"].id!=undefined) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
  
}
