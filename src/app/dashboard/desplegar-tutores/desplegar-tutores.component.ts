import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { MatSort } from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material';
import { MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Tutor } from '../../models/tutor.model';
import { TutorService } from '../../services/tutor.service';
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
	displayedColumns = ['matricula', 'campus', 'name', 'lastname', 'email', 'average', 'isElegible', 'courseGrade', 'isTutor' ];
	constructor(private tutorService: TutorService, private http: HttpClient, public dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef) { 
	}

	@ViewChild(MatPaginator) paginator: MatPaginator;

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
	}


  ngOnInit() {
  	//console.log(this.dataSource)
  	this.tutors = this.http.get('https://ipn-backend.herokuapp.com/tutors/list');
  	this.tutorService.getAllTutors().subscribe((response) => {this.dataSource.data = response;
  		console.log(this.dataSource.data);
  	});
  }

  onEdit(tutor): void{
  	let dialogRef = this.dialog.open(EditarTutoresComponent, {
  		width: '800px',
  		data: tutor,
  		disableClose: true,
  	}).afterClosed().subscribe(result => {
  		this.refresh();
  	});
  }

  refresh() {
  	this.tutorService.getAllTutors().subscribe((response) => {
  		this.dataSource.data = response;
  		this.changeDetectorRefs.detectChanges();
  	})
  }

  toggleElegibilidad(tutor) {
    this.tutorService.editTutor(tutor).subscribe(
      (response) => {
      	tutor.isElegible = !tutor.isElegible;
        console.log(response);
        console.log("Se edito tutor exitosamente!");
      },
      (error) => {
        console.log(error);
        console.log("No se pudo enviar forma.");
      });

  }

  toggleTutor(tutor) {
    this.tutorService.editTutor(tutor).subscribe(
      (response) => {
      	tutor.isTutor = !tutor.isTutor;
        console.log(response);
        console.log("Se edito tutor exitosamente!");
      },
      (error) => {
        console.log(error);
        console.log("No se pudo enviar forma.");
      });

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
