// Modulos
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatDialogModule, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, MatTabsModule  } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
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
import { DescargaInteresadosComponent } from './dashboard/descarga-interesados/descarga-interesados.component';
import { RegistroTutorComponent, SuccessComponent } from './dashboard/registro-tutor/registro-tutor.component';
import { DesplegarTutoresComponent } from './dashboard/desplegar-tutores/desplegar-tutores.component';
import { FijarPlazasComponent } from './dashboard/fijar-plazas/fijar-plazas.component';

// Servicios
import { UserService } from './services/user.service';
import { RegistroService } from './services/registro.service';
import { TutorService } from './services/tutor.service';
import { PlazaService } from './services/plaza.service';
import { ExcelServiceService } from './services/excel-service.service';


//Guardias
import { AuthguardGuard, LoginGuard } from './guards/authguard.guard';

// Directivos
import { EqualValidator } from './dashboard/registro-admins/passwordMatch.directive';


import { AgregarMateriaComponent } from './dashboard/agregar-materia/agregar-materia.component';
import { VerReportesComponent } from './dashboard/ver-reportes/ver-reportes.component';
import { EditarTutoresComponent, WarningComponent } from './dashboard/desplegar-tutores/editar-tutores/editar-tutores.component';

// Pipes
import { FiltroMaterias } from './dashboard/registro-tutor/filtroMaterias.pipe';




// Rutas
const appRoutes:Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    canActivate: [LoginGuard],
    component: LoginComponent
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

    path: 'dashboard/fijar-plazas',
    canActivate: [AuthguardGuard],
    component: FijarPlazasComponent
  },
  {

    path: 'dashboard/materias',
    canActivate: [AuthguardGuard],
    component: AgregarMateriaComponent
  },
  {
    path: 'dashboard/registro-tutor',
    canActivate: [AuthguardGuard],
    component: RegistroTutorComponent
  },
  {
    path: 'dashboard/reportes',
    canActivate: [AuthguardGuard],
    component: VerReportesComponent
  },
  {
    path: 'dashboard/lista-tutores',
    canActivate: [AuthguardGuard],
    component: DesplegarTutoresComponent
  }

  
  
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    HomeComponent,
    RegistroAdminsComponent,
    EqualValidator,
    DescargaInteresadosComponent,
    FijarPlazasComponent,
    RegistroTutorComponent,
    SuccessComponent,
    WarningComponent,
    DesplegarTutoresComponent,
    EditarTutoresComponent,
    AgregarMateriaComponent,
    VerReportesComponent,
    FiltroMaterias
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    ConfirmationPopoverModule.forRoot({
      hideCancelButton: true,
      confirmText: 'Confirmar'
    }),
    Ng2TableModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule
    //PaginationModule.forRoot()
  ],
  providers: [RegistroService,UserService, AuthguardGuard, LoginGuard, ExcelServiceService, TutorService, PlazaService],
  bootstrap: [AppComponent],
  entryComponents: [EditarTutoresComponent, SuccessComponent, WarningComponent]

})
export class AppModule { }
