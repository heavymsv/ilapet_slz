import { Component,Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer-general',
  templateUrl: './footer-general.component.html',
  styleUrls: ['./footer-general.component.css']
})
export class FooterGeneralComponent {
  @Input() num:number=0

  constructor(
    public router:Router
  ){}

  onclick(){
    this.router.navigate([])
  }
}
