// Modulos
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Ng2TableModule } from 'ng2-table/ng2-table';
//import{PaginationModule} from 'ngx-bootstrap/pagination'

//Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { RegistroAdminsComponent } from './dashboard/registro-admins/registro-admins.component';
import { RegistroComponent } from './registro/registro.component';
import { DescargaInteresadosComponent } from './dashboard/descarga-interesados/descarga-interesados.component';
import { ViewTutorsComponent } from './view-tutors/view-tutors.component';

// Servicios
import { UserService } from './services/user.service';
import { RegistroService } from './services/registro.service';
import { ExcelServiceService } from './services/excel-service.service';

//Guardias
import { AuthguardGuard } from './guards/authguard.guard';

// Directivos
import { EqualValidator } from './dashboard/registro-admins/passwordMatch.directive';




// Rutas
const appRoutes:Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
    {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'dashboard',
    canActivate: [AuthguardGuard],
    component: DashboardComponent
  },
  {
    path: 'dashboard/registro-admins',
    canActivate: [AuthguardGuard],
    component: RegistroAdminsComponent
  },
  {
    path: 'dashboard/descarga-interesados',
    canActivate: [AuthguardGuard],
    component: DescargaInteresadosComponent
  },
  {
    path: 'tutors',
    component:ViewTutorsComponent

  }
  
  
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    HomeComponent,
    RegistroAdminsComponent,
    EqualValidator,
    DescargaInteresadosComponent,
    ViewTutorsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule,
    HttpClientModule,
    Ng2TableModule
    //PaginationModule.forRoot()
  ],
  providers: [RegistroService,UserService, AuthguardGuard, ExcelServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
