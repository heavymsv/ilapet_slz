import { FormatWidth, getLocaleDateFormat } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  ngOnInit(): void {
      this.date = new Date(this.data.toString()+'Z').toLocaleString('pt-br',{timeZone:'America/Sao_Paulo'})  
  }
  @Input() titulo:string
  @Input() data:Date
  @Input() corpo:string[]
  @Input() id:number
  date:String

  constructor(public router:Router){
  }
   

  mostrarMais(){
     this.router.navigate(['baixa',this.id])
  }

}
