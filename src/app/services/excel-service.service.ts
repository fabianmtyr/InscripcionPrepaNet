import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE ='application/vnd.ms-excel';
//const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
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
  
  //Funcion alterna para guardar Excel, no usada
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
  
  //Funcion principal para guardar Excel
  public specialExport(json: any[], excelFileName: string): void {
      json.map(x => {JSON})
    var worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);//json de tutores a excel
    
    //Renombrado manual de Headers en Excel 
    worksheet.A1.v = "Nombre";
    worksheet.B1.v = "Apellido";
    worksheet.C1.v = "Materia 1";
    worksheet.D1.v = "Materia 2";
    worksheet.E1.v = "Materia 3";
    var wopts: XLSX.WritingOptions = { bookType: 'xlsx', bookSST: false, type: 'binary'};
      const wb: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      var wbout = XLSX.write(wb, wopts);
      let fname = 'tutores_export_' + new Date().getTime() + '.xlsx' //nombre de archivo excel
      FileSaver.saveAs(new Blob([this.s2ab(wbout)], { type: '' }), fname);
  }
  
  //Funcion para convertir el sheet a binario. Usada para no corromper archivo.
  s2ab(s: any) { var buf = new ArrayBuffer(s.length); var view = new Uint8Array(buf); 
  for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF; return buf; }
  
  
}