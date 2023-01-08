import { Component, Input, Inject, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatCalendarCellClassFunction, MatCalendarCellCssClasses} from '@angular/material/datepicker';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { UrlHandlingStrategy } from '@angular/router';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment } from 'moment';
import IExame from 'src/app/interfaces/IExame';
import IProced from 'src/app/interfaces/IProced';
import IVacina from 'src/app/interfaces/IVacina';
import { ProcedimentoService } from 'src/app/services/procedimento.service';
import { DialogData, TextoCartao } from '../geral-cliente/geral-cliente.component';

const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.component.html',
  styleUrls: ['./dialog-overview-example-dialog.component.css']
})

export class DialogOverviewExampleDialogComponent {
  public compromissos:IProced[]
  public exames:IExame[]
  public vacinas:IVacina[]
  public img="/assets/bubble.webp"

  @ViewChild('carousel') carousel:NgbCarousel
  posIni: any;
  move(pos:number) {
    const offset = this.posIni - pos;
    if (offset < -20) this.carousel.prev()

    if (offset > 20) this.carousel.next();
  }
  

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:DialogData
  ) {
    this.compromissos=data.compromissos
    this.exames=data.exames
    this.vacinas=data.vacinas
  }

  extrairParagrafos(comp:IProced):TextoCartao[]{

    let retorno:TextoCartao[]=[]
    retorno.push({titulo: "Procedimento: ",dados: (comp.procedimentoId==0)?"Consulta":(comp.procedimentoId==1)?"Exame":"Vacina"})
    retorno.push({titulo:"Pet: ",dados:comp.pet.name})
    retorno.push({titulo:"Veterinario: ",dados:comp.veterinario.name})
    if(comp.procedimentoId==1){
      retorno.push({titulo:"Exame: ",dados:this.exames.filter((exame)=>{return exame.id==comp.tipoProcedimento})[0].name})
    } else if(comp.procedimentoId==2){
      let vacina = this.vacinas.filter((vacina)=>{return vacina.id==comp.tipoProcedimento})[0].name
      retorno.push({titulo:"Vacina: ",dados:vacina})
      retorno.push({titulo:"Dose: ",dados:comp.sintomas})
  
    }
    console.log(new Date(comp.date).toLocaleString())
    retorno.push({titulo:"Hora: ",dados:new Date(comp.date.toString()+'Z').toLocaleTimeString('pt-br',{timeZone:'America/Sao_Paulo'})})
    return retorno;

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
