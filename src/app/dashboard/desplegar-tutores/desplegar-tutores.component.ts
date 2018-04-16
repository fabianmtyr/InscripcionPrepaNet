import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Tutor } from '../../models/tutor.model';
import { TutorService } from '../../services/tutor.service';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-desplegar-tutores',
  templateUrl: './desplegar-tutores.component.html',
  styleUrls: ['./desplegar-tutores.component.css']
})
export class DesplegarTutoresComponent implements OnInit {
	dataSource = new TutorDataSource(this.tutorService)
	displayedColumns = ['matricula', 'campus', 'name', 'lastname', 'email', 'altemail', ];

  constructor(private tutorService: TutorService) { }

  ngOnInit() {
  	console.log(this.dataSource)
  }

}

export class TutorDataSource extends DataSource<any> {
	constructor(private tutorService: TutorService) {
		super();
	}
	connect(): Observable<Tutor[]> {
		return this.tutorService.getAllTutors();
	}
	disconnect() {}
}
