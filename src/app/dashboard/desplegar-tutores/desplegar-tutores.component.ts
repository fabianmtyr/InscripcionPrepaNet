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
    
      private rows: Array<any> = []
      public length:number = 0;
    

	tutors:Observable<any> = this.http.get('https://ipn-backend.herokuapp.com/tutors/new');

	dataSource = new MatTableDataSource([]);

	displayedColumns = ['matricula', 'campus', 'carrera', 'semestre', 'nombre', 'apellido', 'correo', 'promedio', 'cumplePromedio', 'calificacionCurso', 'pasoCurso' ];

	constructor(private tutorService: TutorService, private http: HttpClient, public dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef, private userService: UserService,public svs: ExcelServiceService) { 
	}

  Usercampus = this.userService.getLocalStorageCampus()
	@ViewChild(MatPaginator) paginator: MatPaginator;

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
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
                this.rows = response
                this.length = this.rows.length
  	});
  }

  onEdit(tutor): void{
  	let dialogRef = this.dialog.open(EditarTutoresComponent, {
  		data: tutor,
      height: 'auto',
      width: 'auto',
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

  enviarCorreo(tipo) {
    this.tutorService.sendMail({"type": tipo}).subscribe(
      (response) => {
        console.log(response);
        console.log("Se envio el correo correctamente!");
      },
      (error) => {
        console.log(error);
        console.log("No se pudo comunicar con el servidor!");
      })
  }


  
    public downloadExcel(){
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
  }
  
   flatten (data) {
   var result = {};
    function recurse (cur, prop) {
        if (Object(cur) !== cur) {
            result[prop] = cur;
        } else if (Array.isArray(cur)) {
             for(var i=0, l=cur.length; i<l; i++)
                 recurse(cur[i], prop + "[" + i + "]");
            if (l == 0)
                result[prop] = [];
        } else {
            var isEmpty = true;
            for (var p in cur) {
                isEmpty = false;
                recurse(cur[p], prop ? prop+"."+p : p);
            }
            if (isEmpty && prop)
                result[prop] = {};
        }
    }
    recurse(data, "");
    return result;
    };
  

  
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
