import { Component, OnInit } from '@angular/core';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ExcelServiceService } from '../services/excel-service.service';

@Component({
  selector: 'app-view-tutors',
  templateUrl: './view-tutors.component.html',
  styleUrls: ['./view-tutors.component.css']
})


export class ViewTutorsComponent implements OnInit {
  
    public columns:Array<any> = [
    {title: 'Nombre', name: 'name.first', filtering: {filterString: '', placeholder: 'Filtra por nombre'}},
    {title: 'Apellido', name: 'name.last', filtering: {filterString: '', placeholder: 'Filtra por Apellido'}},
    {title: 'Matricula', name: 'matricula', filtering: {filterString: '', placeholder: 'Filtra por matricula'}},
    {title: 'Checked', name:'checked'}
    /*{
      title: 'Position',
      name: 'position',
      sort: false,
      filtering: {filterString: '', placeholder: 'Filter by position'}
    },*/
    //{title: 'Office', className: ['office-header', 'text-success'], name: 'office', sort: 'asc'},
    //{title: 'Extn.', name: 'ext', sort: '', filtering: {filterString: '', placeholder: 'Filter by extn.'}},
    //{title: 'Start date', className: 'text-warning', name: 'startDate'},
    //{title: 'Salary ($)', name: 'salary'}
  ];
  
  //private data:Array<any> = [];
  private tutors:Observable<any> = this.http.get('https://ipn-backend.herokuapp.com/tutors/new');
  private rows: Array<any> = []
  
  public page:number = 1;
  
  public itemsPerPage:number = 10;// checar 
  public maxSize:number = 5; //chear
  
  public numPages:number = 1;//checar
  
  public length:number = 0;
  
    public config:any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered','table']
  };
  
  constructor(private http: HttpClient,
      public svs: ExcelServiceService
      ) {
      this.tutors = this.http.get('https://ipn-backend.herokuapp.com/tutors/list')
      console.log(this.tutors)
      this.tutors.subscribe(tList => {
      console.log(tList)
      this.rows = tList
      this.length = this.rows.length
      });
      
  }

  ngOnInit() {
      //this.onChangeTable(this.config);
  }
  
    public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
    /*if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }*/

    //let filteredData = this.changeFilter(this.data, this.config);
    //let sortedData = this.changeSort(filteredData, this.config);
    //this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    //this.length = sortedData.length;
  }
  
  public onCellClick(data: any): any {
    console.log(data);
  }
  
  public downloadExcel(){
    //this.svs.exportAsExcelFile(this.rows,"tutores")
  }
}
