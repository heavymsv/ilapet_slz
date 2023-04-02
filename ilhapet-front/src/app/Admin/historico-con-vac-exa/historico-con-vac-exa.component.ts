import { Component , Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import IExame from 'src/app/interfaces/IExame';
import IProced from 'src/app/interfaces/IProced';
import IVacina from 'src/app/interfaces/IVacina';
import { ExameService } from 'src/app/services/exame.service';
import { ProcedimentoService } from 'src/app/services/procedimento.service';
import { VacinaService } from 'src/app/services/vacina.service';

@Component({
  selector: 'app-historico-con-vac-exa',
  templateUrl: './historico-con-vac-exa.component.html',
  styleUrls: ['./historico-con-vac-exa.component.css']
})
export class HistoricoConVacExaComponent implements OnInit {
  compromissos:IProced[]
  exames:IExame[]
  vacinas:IVacina[]
  dataReal:Date = new Date()
  loaded:boolean = false
  loaded2:boolean = false

  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = true;
  showPageSizeOptions = false;
  showFirstLastButtons = true;
  disabled = false;

  elementoPesquisa:string="";
  metodoPesquisa:number=1;
  pendente:boolean=true;

  elementoPesquisaDeFato:string="";
  metodoPesquisaDeFato:number=1;
  pendenteDeFato:boolean=false;

  pageEvent: PageEvent

  form: FormGroup;

  constructor(private procedimentoService:ProcedimentoService,
    private exameService:ExameService,
    private vacinaService:VacinaService,
    private formBuilder: FormBuilder,){
  }
  ngOnInit(): void {
    /*this.procedimentoService.getQualifiying(true).subscribe((data)=>{
      //console.log("data: ",data);      
      this.compromissos = data.content
      this.pageSize = data.pageable.pageSize
      this.length = data.totalElements
      this.pageIndex = data.number
    });*/
    this.procedimentoService.getListAdmin(this.metodoPesquisaDeFato,this.elementoPesquisaDeFato,this.pendenteDeFato).subscribe((data)=>{
      //console.log("data: ",data);      
      this.compromissos = data.content
      this.pageSize = data.pageable.pageSize
      this.length = data.totalElements
      this.pageIndex = data.number
    });
    this.exameService.get().subscribe((data)=>{
      //console.log(data);
      this.exames = data
      this.loaded2 = true
    })
    this.vacinaService.get().subscribe((data)=>{
      //console.log(data);
      this.vacinas = data
      this.loaded = true
    })

    this.configureForm()
    
  }

  configureForm() {
    this.form = this.formBuilder.group({
      pesquisa: ['', [Validators.required]],
    });
  }

  pesquisar(){
    this.elementoPesquisaDeFato = this.elementoPesquisa
    this.metodoPesquisaDeFato = this.metodoPesquisa
    this.pendenteDeFato = !this.pendente
    
    this.loaded = false

    this.procedimentoService.getListAdmin(this.metodoPesquisaDeFato,this.elementoPesquisaDeFato,this.pendenteDeFato).subscribe((data)=>{    
      this.compromissos = data.content
      this.pageSize = data.pageable.pageSize
      this.length = data.totalElements
      this.pageIndex = data.number
      this.loaded = true
    });

  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.loaded = false
    this.procedimentoService.getListAdmin(this.metodoPesquisaDeFato,this.elementoPesquisaDeFato,this.pendenteDeFato, this.pageIndex).subscribe((data)=>{    
      this.compromissos = data.content
      this.pageSize = data.pageable.pageSize
      this.length = data.totalElements
      this.pageIndex = data.number
      this.loaded = true
    });
    
  }

  verificaCompromisso(num:number):string{
    return num==0?'Consulta':(num==1?'Exame':num==2?'Vacina':'Banho e Tosa')
  }

  extrairInformacao(compromisso:IProced):string[]{
    let volta:string[] = []
    volta.push("Responsável: " + compromisso.pet.user.name )
    volta.push("Pet: " + compromisso.pet.name + ` (${compromisso.pet.tipo})` )
    volta.push(((compromisso.procedimentoId==4)?"Profissional: ":"Veterinário: ") + compromisso.veterinario.name )

    //console.log(compromisso);

    if(compromisso.procedimentoId==0){
      volta.push("Sintomas: " + compromisso.sintomas )
    }else if(compromisso.procedimentoId==1){
      
        volta.push("Exame: " + this.exames.filter((exame)=>{return exame.id==compromisso.tipoProcedimento})[0].name)
     
      
    }else if(compromisso.procedimentoId==2){
      
        let vacina = this.vacinas.filter((vacina)=>{return vacina.id==compromisso.tipoProcedimento})[0].name
        volta.push("Vacina: " + vacina )
        volta.push("Dose: " + compromisso.sintomas )
      
    }else{
        volta.push("Procedimento: " + (compromisso.tipoProcedimento==1)?"Banho":((compromisso.tipoProcedimento==2)?"Banho e Tosa":((compromisso.tipoProcedimento==3)?"Banho e tosa higiênica":"Corte de unha")))
    }
    return volta;
  }

}
