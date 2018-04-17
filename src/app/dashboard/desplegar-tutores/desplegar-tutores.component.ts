import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Tutor } from '../../models/tutor.model';
import { TutorService } from '../../services/tutor.service';
import { DataSource } from '@angular/cdk/collections';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-desplegar-tutores',
  templateUrl: './desplegar-tutores.component.html',
  styleUrls: ['./desplegar-tutores.component.css']
})
export class DesplegarTutoresComponent implements OnInit {

	tutors:Observable<any> = this.http.get('https://ipn-backend.herokuapp.com/tutors/new');
	dataSource = new MatTableDataSource([]);
	displayedColumns = ['matricula', 'campus', 'name', 'lastname',  'email', 'altemail', 'grades'];
	constructor(private tutorService: TutorService, private http: HttpClient) { 
	}

	@ViewChild(MatPaginator) paginator: MatPaginator;

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
	}


  ngOnInit() {
  	//console.log(this.dataSource)
  	this.tutors = this.http.get('https://ipn-backend.herokuapp.com/tutors/list');
  	this.tutorService.getAllTutors().subscribe((response) => this.dataSource.data = response);
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
