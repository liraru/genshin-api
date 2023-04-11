import { Injectable } from '@nestjs/common';
import * as ExcelToJson from 'convert-excel-to-json';
import * as fs from 'fs';

interface IExcelRow {
  A: string;
  B: string;
  C: string;
  D: number;
  E: number;
  F: number;
  G: number;
  H: string;
  I: string;
}

interface IExcelRowTitle {
  Type: string;
  Name: string;
  Time: string;
  Rarity: number;
  Pity: number;
  Roll: number;
  Group: number;
  Title: string;
  Part: string;
}

@Injectable()
export class AutoImportWishService {
  constructor() {
    console.log('AutoImport constructor');
  }

  private excelColumnToExcelTitle(excelRow: IExcelRow): IExcelRowTitle {
    return {
      Type: excelRow.A,
      Name: excelRow.B,
      Time: excelRow.C,
      Rarity: excelRow.D,
      Pity: excelRow.E,
      Roll: excelRow.F,
      Group: excelRow.G,
      Title: excelRow.H,
      Part: excelRow.I
    };
  }

  readExcel() {
    console.log('readExcel');
    const excelData = ExcelToJson({
      source: fs.readFileSync('excel/paimonmoe_wish_history.xlsx'),
      header: { rows: 1 }
    });

    const banners = {
      character: excelData['Character Event'],
      weapon: excelData['Weapon Event'],
      standard: excelData['Standard']
    };

    
    banners.character.forEach((row: IExcelRow) => {
      const parsed: IExcelRowTitle = this.excelColumnToExcelTitle(row);

    });
  }
}
