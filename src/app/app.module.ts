// Modulos
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Ng2TableModule } from 'ng2-table/ng2-table';

//Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { RegistroComponent } from './registro/registro.component';
import { ViewTutorsComponent } from './view-tutors/view-tutors.component';

// Servicios
import { UserService } from './services/user.service';
import { RegistroService } from './services/registro.service';
import { ExcelServiceService } from './services/excel-service.service';

//Guardias
import { AuthguardGuard } from './guards/authguard.guard';


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
    ViewTutorsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule,
    HttpClientModule,
    Ng2TableModule 
  ],
  providers: [RegistroService,UserService, AuthguardGuard, ExcelServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
