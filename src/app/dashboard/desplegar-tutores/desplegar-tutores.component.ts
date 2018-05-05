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
import { ExcelServiceService } from '../../services/excel-service.service';
import { UserService } from '../../services/user.service';
import { DataSource } from '@angular/cdk/collections';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SelectionModel } from '@angular/cdk/collections';
import { EditarTutoresComponent } from './editar-tutores/editar-tutores.component';
import { SuccessComponent } from '../registro-tutor/registro-tutor.component';


@Component({
  selector: 'app-desplegar-tutores',
  templateUrl: './desplegar-tutores.component.html',
  styleUrls: ['./desplegar-tutores.component.css']
})
export class DesplegarTutoresComponent implements OnInit {
    
      private rows: Array<any> = []
      public length:number = 0;
    

	tutors:Observable<any> = this.http.get('https://ipn-backend.herokuapp.com/tutors/new');
  listaMaterias:Observable<any>;

	dataSource = new MatTableDataSource([]);
  campuss:string[] = [
    'PRN','AGS','CCM','CCV','CDJ','CEM','CHI','CHS','CSF','CVA','MTY','GDA','HGO','IRA','LAG','LEO','MRL', 'PUE','QRO','SAL','SIN','SLP','TAM','TOL','ZAC'];
  mailForm : FormGroup;
  llegoRespuesta = true;

	displayedColumns = ['matricula', 'campus', 'carrera', 'semestre', 'nombre', 'apellido', 'correo', 'materias', 'periodo', 'promedio', 'cumplePromedio', 'calificacionCurso', 'esTutor' ];

	constructor(private tutorService: TutorService, private http: HttpClient, public dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef, private userService: UserService, private fb: FormBuilder,public svs: ExcelServiceService) { 
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
    this.tutorService.getAllMaterias().subscribe((response) =>{
      this.listaMaterias = response;
      console.log("lista Materias:",this.listaMaterias)
      this.loadTutors();

    });
  }

  loadTutors(){
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
    }).map((list: any) => {
      console.log(list);
      list.forEach((item) => {
        this.listaMaterias.forEach((nom) => {
          if(item.materias[0].materia1 == nom.nombre){
            item.materias[0].materia1 = nom.clave
          }
          else if(item.materias[0].materia2 == nom.nombre){
            item.materias[0].materia2 = nom.clave
          }
          else if(item.materias[0].materia3 == nom.nombre){
            item.materias[0].materia3 = nom.clave
          }
        })
      })
      return list;
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
    }).map((list: any) => {
      console.log(list);
      list.forEach((item) => {
        this.listaMaterias.forEach((nom) => {
          if(item.materias[0].materia1 == nom.nombre){
            item.materias[0].materia1 = nom.clave
          }
          else if(item.materias[0].materia2 == nom.nombre){
            item.materias[0].materia2 = nom.clave
          }
          else if(item.materias[0].materia3 == nom.nombre){
            item.materias[0].materia3 = nom.clave
          }
        })
      })
      return list;
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

  openSuccess(message, title){
    let dialogRef = this.dialog.open(SuccessComponent, {
      data: {m: message, t: title},
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.llegoRespuesta = true;
    });
  }

  enviarCorreo(tipo, campus) {
    this.tutorService.sendMail({"type": tipo, "campus": campus}).subscribe(
      (response) => {
        console.log(response);
        console.log("Se envio el correo correctamente!");
        this.openSuccess(response, "Hola");
      },
      (error) => {
        console.log(error);
        console.log("No se pudo comunicar con el servidor!");
        this.openSuccess("No se pudo enviar el correo!", "Error!")
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
          delete dt['__v']
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
  

  correoPRN(tipo) {
    this.llegoRespuesta = false;
    this.tutorService.sendMail({"type": tipo, "campus": this.mailForm.value.campusSeleccionado}).subscribe(
      (response) => {
        console.log(response);
        console.log("Se envio el correo correctamente!");

        this.openSuccess(response['message'], "Estatus del Correo");
      },
      (error) => {
        console.log(error);
        console.log("No se pudo comunicar con el servidor!");
        this.openSuccess(this.mailForm.value.campusSeleccionado, "Error, no se pudo enviar un correo a los alumnos del campus:");
      })
  }

  updateBB(){
    this.tutorService.generaBB().subscribe((response) => {
      console.log(response)
      this.refresh()
    },
    (error) => {
      console.log(error);
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
