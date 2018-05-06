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
  
  //Declaracion de arreglo de renglones y tamaño
  private rows: Array<any> = []
  public length:number = 0;
    
  //Observables de tipo tutores y lista materias
	tutors:Observable<any> = this.http.get('https://ipn-backend.herokuapp.com/tutors/new');
  listaMaterias:Observable<any>;

  //declaracion de objecto tipo datasource para guardar info en tabla
	dataSource = new MatTableDataSource([]);

  // El arreglo que desplega las opciones de los diferentes campus
  campuss:string[] = [
    'PRN','AGS','CCM','CCV','CDJ','CEM','CHI','CHS','CSF','CVA','MTY','GDA','HGO','IRA','LAG','LEO','MRL', 'PUE','QRO','SAL','SIN','SLP','TAM','TOL','ZAC'];

  // Objeto para guardar los valores de la forma
  mailForm : FormGroup;

  // booleano para ver si llego respuesta y deshabilitar botones de enviar correos
  llegoRespuesta = true;

  // arreglo de nombres de columnas para desplegar en la tabla
	displayedColumns = ['matricula', 'campus', 'carrera', 'semestre', 'nombre', 'apellido', 'correo', 'materias', 'periodo', 'promedio', 'cumplePromedio', 'calificacionCurso', 'esTutor' ];

	constructor(private tutorService: TutorService, private http: HttpClient, public dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef, private userService: UserService, private fb: FormBuilder,public svs: ExcelServiceService) { 
    this.createForm()
	}

  // almacena el campus registrado a la cuenta de usuario
  Usercampus = this.userService.getLocalStorageCampus()

  // view child para configurar paginador
	@ViewChild(MatPaginator) paginator: MatPaginator;

  // afterViewInit para configurar el paginador con los datos de tabla
	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
	}

  //funcion para crear la forma que se enviara al servidor para enviar correos
  createForm(){
    this.mailForm = this.fb.group({
      campusSeleccionado: ['', Validators.required]
    });
  }

  // filtro para el buscador en la tabla
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  // funcion que se ejecuta al principio
  ngOnInit() {
  	//obtiene las materias y las guarda en 
    this.tutorService.getAllMaterias().subscribe((response) =>{
      this.listaMaterias = response;
      console.log("lista Materias:",this.listaMaterias)
      // cuando tiene todas las materias carga los datos a la tabla
      this.loadTutors();

    });
  }

  // funcion para descargar datos de tutores a la tabla
  loadTutors(){
    //asigna a tutor el observable de lista de tutores
    this.tutors = this.http.get('https://ipn-backend.herokuapp.com/tutors/list');

    // pide la lista de tutores y los filtra dependiendo del campus 
    // registrado en la cuenta de usuario 
    this.tutorService.getAllTutors().map((list: any) => {
      if(this.Usercampus !== 'PRN'){
        return list.filter(value => {
          if(value["campus"] == undefined) return true;
          if(value["campus"] !== this.Usercampus) return false;
          return true;
        });
      }
      else return list;

      //despues de filtrar, cambia los nombres de las materias
      // por las claves para que la tabla sea mas legible
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

      //se subscribe a los datos
    }).subscribe((response) => {
      this.dataSource.data = response;
      console.log(this.dataSource.data);
                this.rows = response
                this.length = this.rows.length
    });
  }

  // funcion que abre el dialogo de editar cuando se hace clic en
  // la matricula del candidato en la tabla
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

  // funcion para actualizar los datos con los cambios hechos
  // Es muy similar a la funcion de load tutors
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

  // funcion para cambiar el 'si' o 'no' en el boton
  // de cumplePromedio del tutor en la tabla
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

  // igual que toggleElegibilidad es Tutor
  toggleTutor(tutor) {
  	tutor.esTutor = !tutor.esTutor;
    this.tutorService.editTutor(tutor).subscribe(
      (response) => {
        console.log(response);
        console.log("Se edito tutor exitosamente!");
      },
      (error) => {
        console.log(error);
        console.log("No se pudo enviar forma.");
        tutor.esTutor = !tutor.esTutor;
      });

  }

  // funcion para abrir dialogo de exito cuando se envia un correo
  openSuccess(message, title){
    let dialogRef = this.dialog.open(SuccessComponent, {
      data: {m: message, t: title},
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.llegoRespuesta = true;
    });
  }

  // funcion para mandar la forma de correo cuando se hace clic en un boton
  // de enviar correo
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

    //Funcion para pasar Tutores a Excel
    public downloadExcel(){
        
      //Limpiado de DataSourceTutores (Aplanar/borrar atributos no deseados)
      let x = this.dataSource.data.map((dt) => {
          delete dt['_id']
          delete dt['__v']
    return this.flatten(dt);
    
    });
      
      //Llamada a servicio de Excel
      this.svs.specialExport(x,"tutores")
      
      //Save Excel alterno, no usado
      //this.svs.exportAsExcelFile(this.rows,"tutores")    
  }
  
  //Funcion de ayuda para aplanar un Objeto 
  //Usada para pasar tutores a Excel correctamente
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
  
    // funcion para mandar correo cuando el usuario tiene el campus
    // 'PRN' registrado en su cuenta
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

  // Funcion para simular calificaciones de blackboard
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

// Clase para habilitar el dataSource de los tutores
// se utiliza para configurar el paginador y agregar
// tutores al datasource
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
