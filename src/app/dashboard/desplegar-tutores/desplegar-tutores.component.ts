import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MatPaginator } from '@angular/material';
import { MatSort } from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import { MatFormField} from '@angular/material';
import { MatDialog } from '@angular/material';
import { MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Tutor } from '../../models/tutor.model';
import { TutorService } from '../../services/tutor.service';
import { UserService } from '../../services/user.service';
import { DataSource } from '@angular/cdk/collections';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SelectionModel } from '@angular/cdk/collections';
import { EditarTutoresComponent } from './editar-tutores/editar-tutores.component';

@Component({
  selector: 'app-desplegar-tutores',
  templateUrl: './desplegar-tutores.component.html',
  styleUrls: ['./desplegar-tutores.component.css']
})
export class DesplegarTutoresComponent implements OnInit {

	tutors:Observable<any> = this.http.get('https://ipn-backend.herokuapp.com/tutors/new');

	dataSource = new MatTableDataSource([]);
  campuss:string[] = [
    'PRN','AGS','CCM','CCV','CDJ','CEM','CHI','CHS','CSF','CVA','MTY','GDA','HGO','IRA','LAG','LEO','MRL', 'PUE','QRO','SAL','SIN','SLP','TAM','TOL','ZAC'];
  mailForm = FormGroup;

	displayedColumns = ['matricula', 'campus', 'carrera', 'semestre', 'nombre', 'apellido', 'correo', 'periodo', 'promedio', 'cumplePromedio', 'calificacionCurso', 'pasoCurso' ];

	constructor(private tutorService: TutorService, private http: HttpClient, public dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef, private userService: UserService, private fb: FormBuilder) { 
    this.createForm()
	}

  Usercampus = this.userService.getLocalStorageCampus()
	@ViewChild(MatPaginator) paginator: MatPaginator;

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
	}

  createForm(){
    this.mailForm = this.fb.group({
      campusSeleccionado: ['', Validators.required]
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
  	//console.log(this.dataSource)

  	this.tutors = this.http.get('https://ipn-backend.herokuapp.com/tutors/list');
  	this.tutorService.getAllTutors().map((list: any) => {
      if(this.Usercampus !== 'PRN'){
        return list.filter(value => {
          if(value["campus"] == undefined) return true;
          if(value["campus"] !== this.Usercampus) return false;
          return true;
        });
      }
      else return list;
    }).subscribe((response) => {
      this.dataSource.data = response;


  		console.log(this.dataSource.data);
  	});
  }

  onEdit(tutor): void{
  	let dialogRef = this.dialog.open(EditarTutoresComponent, {
  		data: tutor,
      height: 'auto',
      width: '400px',
  		disableClose: true,
  	}).afterClosed().subscribe(result => {
  		this.refresh();
  	});
  }

  refresh() {
  	this.tutorService.getAllTutors().map((list: any) => {
      if(this.Usercampus !== 'PRN'){
        return list.filter(value => {
          if(value["campus"] == undefined) return true;
          if(value["campus"] !== this.Usercampus) return false;
          return true;
        });
      }
      else return list;
    }).subscribe((response) => {
  		this.dataSource.data = response;
  		this.changeDetectorRefs.detectChanges();
  	})
  }

  toggleElegibilidad(tutor) {
  	tutor.cumplePromedio = !tutor.cumplePromedio;
    this.tutorService.editTutor(tutor).subscribe(
      (response) => {
        console.log(response);
        console.log("Se edito tutor exitosamente!");
      },
      (error) => {
        console.log(error);
        console.log("No se pudo enviar forma.");
        tutor.cumplePromedio = !tutor.cumplePromedio;
      });

  }

  toggleTutor(tutor) {
  	tutor.pasoCurso = !tutor.pasoCurso;
    this.tutorService.editTutor(tutor).subscribe(
      (response) => {
        console.log(response);
        console.log("Se edito tutor exitosamente!");
      },
      (error) => {
        console.log(error);
        console.log("No se pudo enviar forma.");
        tutor.pasoCurso = !tutor.pasoCurso;
      });

  }

  enviarCorreo(tipo, campus) {
    this.tutorService.sendMail({"type": tipo, "campus": campus}).subscribe(
      (response) => {
        console.log(response);
        console.log("Se envio el correo correctamente!");
      },
      (error) => {
        console.log(error);
        console.log("No se pudo comunicar con el servidor!");
      })
  }

  correoPRN(tipo) {
    this.tutorService.sendMail({"type": tipo, "campus": this.mailForm.value.campusSeleccionado}).subscribe(
      (response) => {
        console.log(response);
        console.log("Se envio el correo correctamente!");
      },
      (error) => {
        console.log(error);
        console.log("No se pudo comunicar con el servidor!");
      })
  }
  
}

export class TutorDataSource extends DataSource<any> {
	constructor(private tutorService: TutorService) {
		super();
	}
	paginator: MatPaginator | null;
    private _paginator;

	connect(): Observable<Tutor[]> {
		return this.tutorService.getAllTutors();
	}
	disconnect() {}
}
