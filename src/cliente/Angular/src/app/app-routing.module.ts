import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/components/login/login.component';
import { RegistroComponent } from 'src/components/registro/registro.component';
import { HomeUsuarioComponent } from 'src/components/home-usuario/home-usuario.component';
import { HomeEmpresaComponent } from 'src/components/home-empresa/home-empresa.component';
import { DatosEmpresaComponent } from 'src/components/datos-empresa/datos-empresa.component';
import { CalendarioComponent } from 'src/components/calendario/calendario.component';
import { EmpresaServiciosComponent } from 'src/components/empresa-servicios/empresa-servicios.component';
import { ViewEmpresaUsuarioComponent } from 'src/components/view-empresa-usuario/view-empresa-usuario.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { EditarPerfilUsuarioComponent } from 'src/components/editar-perfil-usuario/editar-perfil-usuario.component';
import { EditarPerfilEmpresaComponent } from 'src/components/editar-perfil-empresa/editar-perfil-empresa.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'usuario', component: HomeUsuarioComponent, canActivate : [AuthGuardGuard] },
  { path: 'empresa', component: HomeEmpresaComponent , canActivate : [AuthGuardGuard]},
  { path: 'empresa/datos', component: DatosEmpresaComponent , canActivate : [AuthGuardGuard]},
  { path: 'empresa/calendario', component: CalendarioComponent , canActivate : [AuthGuardGuard]},
  { path: 'empresa/servicios', component: EmpresaServiciosComponent , canActivate : [AuthGuardGuard]},
  { path: 'usuario/:cif_empresa', component: ViewEmpresaUsuarioComponent , canActivate : [AuthGuardGuard]},
  { path: 'usuario/editar/perfil', component: EditarPerfilUsuarioComponent , canActivate : [AuthGuardGuard]},
  { path: 'empresa/editar/perfil', component: EditarPerfilEmpresaComponent , canActivate : [AuthGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


