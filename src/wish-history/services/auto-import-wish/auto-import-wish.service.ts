import { Injectable } from '@nestjs/common';
import * as ExcelToJson from 'convert-excel-to-json';
import * as fs from 'fs';

@Injectable()
export class AutoImportWishService {
  constructor() {
    console.log('AutoImport constructor');
  }

  readExcel() {
    console.log('readExcel');
    const excelData = ExcelToJson({ source: fs.readFileSync('excel/paimonmoe_wish_history.xlsx') });
    console.log(excelData);
  }
}
