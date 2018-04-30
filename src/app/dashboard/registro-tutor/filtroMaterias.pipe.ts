import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroMaterias'
})

export class FiltroMaterias implements PipeTransform {
  transform(lista: any[], materia: any): any[] {
  	return lista.filter(item => {
  		if(item === ' ') return true;
  		if(item !== materia) return true;
  		return false;
  	})
   }
}