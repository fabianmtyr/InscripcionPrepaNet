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

      private rows: Array<any> = []
      public length:number = 0;
    

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
  	//console.log(this.dataSource)
  	this.tutors = this.http.get('https://ipn-backend.herokuapp.com/tutors/list');
  	this.tutorService.getAllTutors().subscribe((response) => {
                this.dataSource.data = response;
  		console.log(this.dataSource.data);
                this.rows = response
                this.length = this.rows.length
  	});
  }
  
  /*
  refresh() {
  	this.tutorService.getAllTutors().subscribe((response) => {
  		this.dataSource.data = response;
  		this.changeDetectorRefs.detectChanges();
  	})
  }*/

  toggleElegibilidad(tutor) {
  	tutor.isElegible = !tutor.isElegible;
    this.tutorService.editTutor(tutor).subscribe(
      (response) => {
        console.log(response);
        console.log("Se edito tutor exitosamente!");
      },
      (error) => {
        console.log(error);
        console.log("No se pudo enviar forma.");
        tutor.isElegible = !tutor.isElegible;
      });

  }
  
    applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  
    /*public downloadExcel(){
    //this.svs.exportAsExcelFile(this.rows,"tutores")
      console.log(this.rows)
      let flat = {};
      var pth=''
      let x = this.dataSource.data.map((dt) => {
      //let x =this.rows.map((dt) => {
          delete dt['_id']
    return this.flatten(dt);
    
    });
      console.log(x)
      this.svs.specialExport(x,"tutores")      
  }*/
  
  //tabChangeEvent : MatTabChangeEvent
  tabChanged(tabChangeEvent){
  console.log('tabChangeEvent => ', tabChangeEvent);
  console.log('index => ', tabChangeEvent.index);
  
  if(tabChangeEvent.index == 0){
      this.displayedColumns = ['matricula', 'courseGrade'];
      this.dataSource.data=this.rows;
      
      this.dataSource.data.sort((a, b) => {return ((b.calificacionCurso || -1*1) - (a.calificacionCurso || -1*1))})
      this.dataSource._updateChangeSubscription()
      
      //filter by courseGrade > passGrade
            //this.dataSource.data
      
  }
  
  else if(tabChangeEvent.index == 1){
      this.displayedColumns = ['matricula', 'materia1', 'materia2', 'materia3'];
      //this.displayedColumns = ['matricula', 'materias'];
      this.dataSource.data = this.rows.filter((tut) => {return (tut.calificacionCurso && tut.calificacionCurso > 80)})
      console.log(this.rows)
      this.dataSource._updateChangeSubscription()
      //filter by courseGrade > 80
      //this.dataSource.data
  }
  
  else {
      this.displayedColumns = ['matricula', 'promedio'];
      //no filter, undo filter
      this.dataSource.data=this.rows;
      this.dataSource.data.sort((a, b) => {return ((b.promedio || -1*1) - (a.promedio || -1*1))})
      this.dataSource._updateChangeSubscription()
  }
  
  }
  /*
    sortData(sort) {
    const data = this.rows.slice();
    //const data = this.dataSource.data
    if (!sort.active || sort.direction == '') {
      this.sortedData = data;
      return;
    }
  }

 compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}*/

}