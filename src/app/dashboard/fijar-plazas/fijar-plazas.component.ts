import { Component, OnInit } from '@angular/core';
import { Plaza } from 'app/models/plaza.model';
import { PlazaService } from 'app/services/plaza.service';
import { UserService } from 'app/services/user.service';
import { Observable } from 'rxjs/Observable';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SuccessComponent } from '../registro-tutor/registro-tutor.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';



@Component({
  selector: 'app-fijar-plazas',
  templateUrl: './fijar-plazas.component.html',
  styleUrls: ['./fijar-plazas.component.css']
})
export class FijarPlazasComponent {
  
  plazas:Observable<any> = this.http.get('https://ipn-backend.herokuapp.com/plazas/edit');
  constructor(private plazaService: PlazaService, private userService: UserService, private http: HttpClient, public dialog: MatDialog) { }



  campuses:string[] = [
    'AGS','CCM','CCV','CDJ','CEM','CHI','CHS','CSF','CVA','MTY','GDA','HGO','IRA','LAG','LEO','MRL', 'PRN', 'PUE','QRO','SAL','SIN','SLP','TAM','TOL','ZAC'];
  

  current_campus = this.userService.getLocalStorageCampus()

  isPRN = true;

  plaza = new Plaza('PRN', 0, 0, 0);

  
   
   ngOnInit() {

    this.plazas = this.http.get('https://ipn-backend.herokuapp.com/plazas/edit');
    this.plazaService.getPlaza().subscribe((response) => {this.plazas = response;
      console.log(this.plazas);

      if(this.userService.getLocalStorageCampus() == 'PRN'){
        for(var i = 0; i < response.length; ++i) {
        //if the name is what we are looking for return it
          if(this.plazas[i]['campus'] === this.plaza.campus){
              this.plaza.tutores = this.plazas[i]['tutores'];
              this.plaza.staff = this.plazas[i]['staff'];
              this.plaza.coords = this.plazas[i]['coords'];
            } 
         }
      }
      else
       {
         for(var i = 0; i < response.length; ++i) {
        //if the name is what we are looking for return it
          if(this.plazas[i]['campus'] === this.userService.getLocalStorageCampus()){
              this.plaza.tutores = this.plazas[i]['tutores'];
              this.plaza.staff = this.plazas[i]['staff'];
              this.plaza.coords = this.plazas[i]['coords'];
            } 
         }
       } 
      

    });



     if(this.userService.getLocalStorageCampus() == 'PRN'){
         this.isPRN = true;
     }
     else{
         this.isPRN = false;
         this.plaza.campus = this.userService.getLocalStorageCampus();
     }

  }  

  submitted = false;

  onSubmit() { 

   this.submitted = true;  console.log(this.plaza); {
    
  }

  
   
}


  get diagnostic() { return JSON.stringify(this.plaza); }


   openSuccess(message, title){
    let dialogRef = this.dialog.open(SuccessComponent, {
      data: {m: message, t: title},
      disableClose: true,
    });

  }
   editarPlaza() {
     console.log("Entraste a función");
    this.plazaService.editPlaza(this.plaza).subscribe(
      (response) => {
        console.log(response);
        console.log("Se editaron plazas");
      //   let a = this.plazas.length
      //   console.log(this.plaza.campus + "popis" + a)

        
        if(this.plaza.campus == 'PRN'){
        for(var i = 0; i < this.campuses.length + 1; ++i) {
        //if the name is what we are looking for return it
          if(this.plazas[i]['campus'] == 'PRN'){
              this.plaza.tutores = this.plazas[i]['tutores'];
              this.plaza.staff = this.plazas[i]['staff'];
              this.plaza.coords = this.plazas[i]['coords'];
            } 
         }
      }
      else
       {
         for(var i = 0; i < this.campuses.length + 1; ++i) {
        //if the name is what we are looking for return it
          if(this.plazas[i]['campus'] === this.plaza.campus){
              this.plaza.tutores = this.plazas[i]['tutores'];
              this.plaza.staff = this.plazas[i]['staff'];
              this.plaza.coords = this.plazas[i]['coords'];
            } 
         }
       } 
      this.openSuccess("Se agregaron las plazas exitosamente:", "¡Exito!")
        
      },
      (error) => {
        console.log(error);
        console.log("No se pudo enviar forma.");
      }); 
  }

  updateCampus(){

    console.log("caca")

    if(this.plaza.campus === 'PRN'){
        for(var i = 0; i < this.campuses.length + 1; ++i) {
        //if the name is what we are looking for return it
          if(this.plazas[i]['campus'] == 'PRN'){
              this.plaza.tutores = this.plazas[i]['tutores'];
              this.plaza.staff = this.plazas[i]['staff'];
              this.plaza.coords = this.plazas[i]['coords'];
            }
         }
      }
      else
       {
         for(var i = 0; i < this.campuses.length + 1; ++i) {
        //if the name is what we are looking for return it
          if(this.plazas[i]['campus'] === this.plaza.campus){
              this.plaza.tutores = this.plazas[i]['tutores'];
              this.plaza.staff = this.plazas[i]['staff'];
              this.plaza.coords = this.plazas[i]['coords'];
            } 

         }
       } 
  }


}
