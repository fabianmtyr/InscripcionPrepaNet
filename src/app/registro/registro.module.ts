import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroComponent } from './registro.component';
import { MatriculaValidatorDirective } from './matricula-validator.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [RegistroComponent, MatriculaValidatorDirective],
  exports:[RegistroComponent]
})
export class RegistroModule { }
