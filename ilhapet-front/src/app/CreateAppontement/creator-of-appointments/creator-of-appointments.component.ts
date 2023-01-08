import { Component, OnInit } from '@angular/core';
import IExame from 'src/app/interfaces/IExame';
import IPet from 'src/app/interfaces/IPet';
import IVacina from 'src/app/interfaces/IVacina';
import IVets from 'src/app/interfaces/IVets';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ExameService } from 'src/app/services/exame.service';
import { PetService } from 'src/app/services/pet.service';
import { VacinaService } from 'src/app/services/vacina.service';
import { VeterinarioService } from 'src/app/services/veterinario.service';
import IUser from 'src/app/interfaces/IUser';

@Component({
  selector: 'app-creator-of-appointments',
  templateUrl: './creator-of-appointments.component.html',
  styleUrls: ['./creator-of-appointments.component.css']
})
export class CreatorOfAppointmentsComponent implements OnInit {

  constructor(
    private vetService: VeterinarioService,
    public authService:AuthService, 
    public userService:UserService, 
    public petService:PetService,
    public exameService:ExameService,
    public vacinaService:VacinaService
    ){

  }
  
  public user:IUser;
  public pets:IPet[];
  public vets:IVets[];
  exames:IExame[]
  vacinas:IVacina[]

  loaded:boolean = false
  loaded2:boolean = false
  

  ngOnInit(): void {
    
    this.userService.getByName(this.authService.getUsername()).subscribe((data)=>{this.user = data;
                                                                                     this.petService
                                                                                     .getByOwner(this.user.id)
                                                                                     .subscribe((data)=>{
                                                                                       this.pets=data;
                                                                                     })
    })

    this.vetService.get().subscribe((data)=>{
      this.vets = data
    })

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

  
  
}
