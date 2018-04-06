import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx'; //xlsx


@Injectable()
export class ExcelServiceService {



  constructor() { 
  
  
  }
  
    public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' }); //xlsx
    
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  /*
  public exportCSV(json: any[], excelFileName: string){
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    var wboptions = { bookType: 'xlsx', bookSST: false, type: 'binary', showGridLines: false };
    
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' }); //xlsx
    const excelBuffer: any = XLSX.write(workbook, wboptions)
    
    this.saveAsExcelFile(excelBuffer, excelFileName);
      
      
  }*/
  
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
  
}