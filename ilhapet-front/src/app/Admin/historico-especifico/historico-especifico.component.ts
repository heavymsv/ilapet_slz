import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import IExame from 'src/app/interfaces/IExame';
import IPet from 'src/app/interfaces/IPet';
import IProced from 'src/app/interfaces/IProced';
import IVacina from 'src/app/interfaces/IVacina';
import IVets from 'src/app/interfaces/IVets';
import { ExameService } from 'src/app/services/exame.service';
import { ProcedimentoService } from 'src/app/services/procedimento.service';
import { VacinaService } from 'src/app/services/vacina.service';

@Component({
  selector: 'app-historico-especifico',
  templateUrl: './historico-especifico.component.html',
  styleUrls: ['./historico-especifico.component.css']
})
export class HistoricoEspecificoComponent implements OnInit {

  compromisso:IProced
  exames:IExame[]
  vacinas:IVacina[]
  loaded:boolean=false
  loaded2:boolean=false
  loaded3:boolean=false
  date:string
  habilitado:boolean = false
 

  constructor(private procedimentoService:ProcedimentoService,
    private exameService:ExameService,
    private vacinaService:VacinaService,
    private route:ActivatedRoute,
    public router:Router){
  }

  ngOnInit(): void {
    
    this.procedimentoService.getById(Number.parseInt(this.route.snapshot.paramMap.get('compromisso'))).subscribe((data)=>{
      console.log("data: ",data);
      this.compromisso = data
      this.habilitado = this.compromisso.pendente
      this.loaded3 = true
      this.date = new Date(this.compromisso.date.toString()+'Z').toLocaleString('pt-br',{timeZone:'America/Sao_Paulo'})
    });
    this.exameService.get().subscribe((data)=>{
      console.log(data);
      this.exames = data
      this.loaded2 = true
    })
    this.vacinaService.get().subscribe((data)=>{
      console.log(data);
      this.vacinas = data
      this.loaded = true
    })
  }

  verificaCompromisso(num:number):string{
    return num==0?'Consulta':(num==1?'Exame':'Vacina')
  }

  extrairInformacao(compromisso:IProced):string[]{
    
    let volta:string[] = []
    volta.push("Responsável: " + compromisso.pet.user.name )
    volta.push("Pet: " + compromisso.pet.name + ` (${compromisso.pet.tipo})` )
    volta.push("Veterinário: " + compromisso.veterinario.name )

    if(compromisso.procedimentoId==0){
      volta.push("Sintomas: " + compromisso.sintomas )
    }else if(compromisso.procedimentoId==1){
      
        volta.push("Exame: " + this.exames.filter((exame)=>{return exame.id==compromisso.tipoProcedimento})[0].name)
     
      
    }else if(compromisso.procedimentoId==2){
      
        let vacina = this.vacinas.filter((vacina)=>{return vacina.id==compromisso.tipoProcedimento})[0].name
        volta.push("Vacina: " + vacina )
        volta.push("Dose: " + compromisso.sintomas )
      
    }
    return volta;
  }

  darBaixa(){
    console.log(this.compromisso)
    let pet:IPet={id:this.compromisso.pet.id}
    let vet:IVets={id:this.compromisso.veterinario.id,name:this.compromisso.veterinario.name}

    let compromissoNovo:IProced ={
      date:this.compromisso.date,
      id:this.compromisso.id,
      obs:this.compromisso.obs,
      pet:pet,
      procedimentoId:this.compromisso.procedimentoId,
      tipoProcedimento:this.compromisso.tipoProcedimento,
      veterinario:vet,
      pendente:true,
      sintomas:this.compromisso.sintomas
    }

    this.compromisso.pendente = true

    this.habilitado = true
    console.log(this.habilitado)
    this.procedimentoService.update(this.compromisso.id,compromissoNovo).subscribe(
    (data)=>{
      console.log("tudo ok:",data)
    }

    )

  }

}
