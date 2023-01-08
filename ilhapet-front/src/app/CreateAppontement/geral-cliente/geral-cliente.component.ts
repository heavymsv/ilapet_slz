import { Component, Input, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatCalendarCellClassFunction, MatCalendarCellCssClasses} from '@angular/material/datepicker';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig} from '@angular/material/dialog';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment } from 'moment';
import IExame from 'src/app/interfaces/IExame';
import IProced from 'src/app/interfaces/IProced';
import IUser from 'src/app/interfaces/IUser';
import IVacina from 'src/app/interfaces/IVacina';
import { ProcedimentoService } from 'src/app/services/procedimento.service';
import { DialogOverviewExampleDialogComponent } from '../dialog-overview-example-dialog/dialog-overview-example-dialog.component';

const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-geral-cliente',
  templateUrl: './geral-cliente.component.html',
  styleUrls: ['./geral-cliente.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class GeralClienteComponent implements OnInit {
  constructor(private procedimentosService: ProcedimentoService,
    public dialog: MatDialog) {

  }

  @Input() user: IUser
  @Input() vacinas:IVacina[]
  @Input() exames:IExame[]
  procedimentos: IProced[]
  loading:boolean=false

  ngOnInit(): void {
    console.log(this.user);
    this.procedimentosService.getAll(this.user.id).subscribe((data) => {
      console.log(data);
      this.procedimentos = data
      console.log(data);
      this.loading=true

    }
    )

  }

  openDialog(value:DialogData): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      data: value,
      autoFocus: true,
      height:"fit-content",
      maxHeight:"80%",
      maxWidth:"400px",
      width:"80%",
      hasBackdrop: true,
      disableClose:false
    });
  }

  selected: Date | null = null;
  date = new FormControl(moment())

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate;

      // Highlight the 1st and 20th day of each month.
      let filtered = this.procedimentos.filter((dataB)=>{
        let dataA: Date = new Date(Date.parse(dataB.date.toString()));
        
        
        return (dataA.getDate()==date.getDate())
        &&(dataA.getMonth()==date.getMonth())
        &&(dataA.getFullYear()==date.getFullYear());
      }
      )
      console.log('correto: ',filtered.length>0? 'highlight-dates' : 'deityis');
      
      // Highlight saturday and sunday.
      return filtered.length>0? 'example-custom-date-class' : '';
    }

    return '';
  };

  maybePopUp=(date:Date)=>{
    let filtered = this.procedimentos.filter((dataB)=>{
      let dataA: Date = new Date(Date.parse(dataB.date.toString()));
      
      
      return (dataA.getDate()==date.getDate())
      &&(dataA.getMonth()==date.getMonth())
      &&(dataA.getFullYear()==date.getFullYear());
    }
    )
    console.log(filtered);
    if(filtered.length>0){
       

      this.openDialog({
        compromissos:filtered,
        vacinas:this.vacinas,
        exames:this.exames
      })
    }
    this.selected = null

  }

}

export interface TextoCartao{
  titulo:string,
  dados:string
}

export interface DialogData{
  compromissos:IProced[],
  exames:IExame[],
  vacinas:IVacina[]
}


