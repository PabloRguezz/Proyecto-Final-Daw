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
    const expirationTime = decodedToken['exp'] ;
    const expirationTimeMs = expirationTime * 1000;
    const decodedTokenUser = jwt_decode(token);
    const expirationTimeUser = decodedTokenUser['exp'] ;
    const expirationTimeMsUser = expirationTimeUser * 1000;
    const now = Date.now();
    if (now > expirationTimeMs || now > expirationTimeMsUser) {
      this.router.navigate(['']);
      return false;
    } else if(decodedToken["data"].cif_Empresa!=undefined || decodedTokenUser["data"].id!=undefined){
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
  
}
