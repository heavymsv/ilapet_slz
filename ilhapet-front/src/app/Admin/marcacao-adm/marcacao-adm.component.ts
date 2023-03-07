import { Component, Input, OnInit } from '@angular/core';
import ICliente from 'src/app/interfaces/ICliente';
import IPet from 'src/app/interfaces/IPet';
import IUser from 'src/app/interfaces/IUser';
import IVets from 'src/app/interfaces/IVets';
import { ExameService } from 'src/app/services/exame.service';
import { PetService } from 'src/app/services/pet.service';
import { VeterinarioService } from 'src/app/services/veterinario.service';

@Component({
  selector: 'app-marcacao-adm',
  templateUrl: './marcacao-adm.component.html',
  styleUrls: ['./marcacao-adm.component.css']
})
export class MarcacaoAdmComponent implements OnInit {
  @Input() users:IUser[]
  selected:string
  userId:any
  loaded:boolean=false
  loaded2:boolean=false
  vets:IVets[]
  pets:IPet[]

  constructor(
    private vetService: VeterinarioService,
    public petService: PetService,
  )
  {}

  ngOnInit(): void {
    
    this.vetService.get().subscribe((data)=>{
      this.vets = data
      this.loaded =  true
    })
  }


  pessoaDiferente(){
    //console.log("users:",this.users)
    this.loaded2 = false
    //console.log(this.userId)
    if(!(this.userId===undefined)){
      this.petService.getByOwner(this.userId.id).subscribe(
        (data)=>{
          this.pets=data
          this.loaded2=true
        }
      )
    }
  }
}
