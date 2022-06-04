import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const fileExtension = '.xlsx';

@Injectable({
  providedIn: 'root'
})
  // class borrowed from angular excel tutorial https://www.c-sharpcorner.com/article/generate-and-download-excel-file-in-angular-7/
export class ExcelService {

  todaysDate = new Date();
  dd = String(this.todaysDate.getDate()).padStart(2, '0');
  mm = String(this.todaysDate.getMonth() + 1).padStart(2, '0'); //January is 0!
  yyyy = this.todaysDate.getFullYear();

  today = this.yyyy + '-' + this.mm + '-' + this.dd;

  constructor() { }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: fileType });
    FileSaver.saveAs(data, fileName + '_hours_registrated_' + this.today + fileExtension);
  }
}
