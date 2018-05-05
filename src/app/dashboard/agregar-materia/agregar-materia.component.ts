import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { MatSort } from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatFormField} from '@angular/material';
import { MatDialog } from '@angular/material';
import { MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Tutor } from '../../models/tutor.model';
import { TutorService } from '../../services/tutor.service';
import { ExcelServiceService } from '../../services/excel-service.service';
import { UserService } from '../../services/user.service';
import { DataSource } from '@angular/cdk/collections';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SelectionModel } from '@angular/cdk/collections';
import {EditarMateriaComponent} from './editar-materia/editar-materia.component';

@Component({
  selector: 'app-agregar-materia',
  templateUrl: './agregar-materia.component.html',
  styleUrls: ['./agregar-materia.component.css']
})
export class AgregarMateriaComponent implements OnInit {

      private rows: Array<any> = [];
      public length:number = 0;
      public Usercampus:string;
      /*
       * {"clave":clave, "nombre":nombre}
       * POST: <appname>/materias/edit
       * GET: <appname>/materias/list
       */
      
      materiaForm: FormGroup;
      
      materias:Observable<any> = this.http.get('https://ipn-backend.herokuapp.com/materias/list');
      dataSource = new MatTableDataSource([]);
      displayedColumns = ['clave','nombre','tetramestre'];
      //Usercampus = this.userService.getLocalStorageCampus()

  constructor(private http: HttpClient, public dialog: MatDialog, 
            private changeDetectorRefs: ChangeDetectorRef,private userService: UserService, 
            private fb: FormBuilder) {
            this.Usercampus = this.userService.getLocalStorageCampus()
            console.log(this.Usercampus)
            this.createForm();
            }
            
            
   @ViewChild(MatPaginator) paginator: MatPaginator;
   
   ngAfterViewInit() {
       this.dataSource.paginator = this.paginator;
        }

  ngOnInit() {
        //console.log(this.dataSource)
  	this.materias = this.http.get('https://ipn-backend.herokuapp.com/materias/list');
  	this.materias.subscribe((response) => {
                this.dataSource.data = response;
  		console.log(this.dataSource.data);
                this.rows = response
                this.length = this.rows.length
  	});
  }
  
  agregarMateria(){
        let materia = 0;
  	materia = this.materiaForm.value;
        delete materia['tetramestre']
    console.log(materia)
      let resp = this.http.post("https://ipn-backend.herokuapp.com/materias/edit" , materia)
      
      //resp.subscribe()
      resp.subscribe((mat) => {this.dataSource.data.push(mat)
      this.dataSource._updateChangeSubscription()
      })
      console.log(resp)
      
  }
  
    createForm() {
  	this.materiaForm = this.fb.group({
  		clave: ['', Validators.required],
  		nombre:['', Validators.required],
  		periodo: ['',  Validators.required]
  	});
  }
  
  onEdit(materia): void{
      
      if (this.Usercampus==="PRN"){
  	let dialogRef = this.dialog.open(EditarMateriaComponent, {
  		data: materia,
      height: 'auto',
      width: '400px',
  		disableClose: true,
  	}).afterClosed().subscribe(result => {
            console.log(result)
            this.refresh();
            this.dataSource._updateChangeSubscription()
                
  	});
        
        
     }
  }
  
  refresh(){
        this.materias = this.http.get('https://ipn-backend.herokuapp.com/materias/list');
  	this.materias.subscribe((response) => {
                this.dataSource.data = response;
                this.rows = response
                this.length = this.rows.length
  	});
      
  }
}
