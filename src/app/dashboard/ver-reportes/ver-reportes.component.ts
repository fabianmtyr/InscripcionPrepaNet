import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { MatSort } from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import { MatFormField} from '@angular/material';
import { MatDialog } from '@angular/material';
import { MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Tutor } from '../../models/tutor.model';
import { TutorService } from '../../services/tutor.service';
import { ExcelServiceService } from '../../services/excel-service.service';
import { DataSource } from '@angular/cdk/collections';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SelectionModel } from '@angular/cdk/collections';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-ver-reportes',
  templateUrl: './ver-reportes.component.html',
  styleUrls: ['./ver-reportes.component.css']
})
export class VerReportesComponent implements OnInit {

      private rows: Array<any> = [] //filas de tablas de reportes
      public length:number = 0; //cantidad de filas
    

	tutors:Observable<any> = this.http.get('https://ipn-backend.herokuapp.com/tutors/new');
	dataSource = new MatTableDataSource([]);
	displayedColumns = ['matricula', 'courseGrade'];
        
	constructor(private tutorService: TutorService, private http: HttpClient, public dialog: MatDialog, 
            private changeDetectorRefs: ChangeDetectorRef, public svs: ExcelServiceService,) { 
	}

	@ViewChild(MatPaginator) paginator: MatPaginator;

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
	}


  ngOnInit() {
  	//Obtener datos de tutores y ordenar para desplegar en reporte de cursos (el default al abrir pagina)
  	this.tutors = this.http.get('https://ipn-backend.herokuapp.com/tutors/list');
  	this.tutorService.getAllTutors().subscribe((response) => {
                this.rows = response
                this.dataSource.data= response.sort((a, b) => {return ((b.calificacionCurso || -1*1) - (a.calificacionCurso || -1*1))})
                this.length = this.rows.length
  	});
  }
  
  //Manejar cambio de vistas/reporte seleccionado
  tabChanged(tabChangeEvent){
      
  //console.log('tabChangeEvent => ', tabChangeEvent);
  //console.log('index => ', tabChangeEvent.index);
  
  //Reporte de Calificacion de Cursos
  if(tabChangeEvent.index == 0){
      this.displayedColumns = ['matricula', 'courseGrade'];
      this.dataSource.data=this.rows;
      this.dataSource.data.sort((a, b) => {return ((b.calificacionCurso || -1*1) - (a.calificacionCurso || -1*1))})
      this.dataSource._updateChangeSubscription()
      
  }
  //Reporte de Materias
  else if(tabChangeEvent.index == 1){
      this.displayedColumns = ['matricula', 'materia1', 'materia2', 'materia3'];
      this.dataSource.data = this.rows.filter((tut) => {return (tut.calificacionCurso && tut.calificacionCurso > 80)})
        .sort((a, b) => {return ((b.calificacionCurso || -1*1) - (a.calificacionCurso || -1*1))})
      this.dataSource._updateChangeSubscription()
  }
  //Reporte de Promedios
  else {
      this.displayedColumns = ['matricula', 'promedio'];
      this.dataSource.data=this.rows;
      this.dataSource.data.sort((a, b) => {return ((b.promedio || -1*1) - (a.promedio || -1*1))})
      this.dataSource._updateChangeSubscription()
  }
  
  }

}