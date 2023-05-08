import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from '../components/login/login.component';
import { RegistroComponent } from '../components/registro/registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeUsuarioComponent } from 'src/components/home-usuario/home-usuario.component';
import { HeaderLoginComponent } from 'src/components/header-login/header-login.component';
import { CalendarioComponent } from 'src/components/calendario/calendario.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DatosEmpresaComponent } from 'src/components/datos-empresa/datos-empresa.component';
import { HomeEmpresaComponent } from 'src/components/home-empresa/home-empresa.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { SwiperModule } from 'swiper/angular'
import { CommonModule } from '@angular/common';
import { EmpresaHasServiciosService } from 'src/service/empresa_has_servicios/empresa-has-servicios.service';
import { EmpresaService } from 'src/service/empresa/empresa.service';
import { EmpresaServiciosComponent } from 'src/components/empresa-servicios/empresa-servicios.component';
import { HeaderEmpresaComponent } from 'src/components/header-empresa/header-empresa.component';
import { ViewEmpresaUsuarioComponent } from 'src/components/view-empresa-usuario/view-empresa-usuario.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    HomeUsuarioComponent,
    HeaderLoginComponent,
    CalendarioComponent,
    DatosEmpresaComponent,
    HomeEmpresaComponent,
    EmpresaServiciosComponent,
    HeaderEmpresaComponent,
    ViewEmpresaUsuarioComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
    HttpClientModule,
    CarouselModule,
    FullCalendarModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()) 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


