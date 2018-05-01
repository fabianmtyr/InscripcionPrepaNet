import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroMaterias',
  pure: false,
})

export class FiltroMaterias implements PipeTransform {
  transform(lista: Array<any>, materia: any): any[] {
  	return lista.filter(item => {
  		if(item === ' ') return true;
  		if(item !== materia) return true;
  		return false;
  	})
   }
}