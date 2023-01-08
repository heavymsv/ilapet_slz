import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbSlideEvent } from '@ng-bootstrap/ng-bootstrap';
import IBlog from 'src/app/interfaces/IBlog';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  imgs:string[] = []

  post: IBlog[] = []
  slide:number = 0
  diff:number = 0

  constructor(public router: Router,
    public blogService: BlogService,
    public authService:AuthService
  ) {

  }
  ngOnInit(): void {
    this.blogService.get3().subscribe((data) => {
      this.post = data
      this.imgs=[]

      
      
      for (const element of data) {
        this.imgs.push("assets/uped_imgs/"+element.imagem)
        console.log(element.imagem)
      }

    })

  }

  verifica(): boolean {
    let key = localStorage.getItem('T-WMS_token')
    return key == undefined
  }

  verificaNivel():boolean{
    let key = localStorage.getItem('T-WMS_token')
    //console.log((key==undefined)?false:(this.authService.validateRole(['ROLE_ADMIN'])));
    
    return (key==undefined)?false:(this.authService.validateRole(['ROLE_ADMIN']))
  }

  countSlide(event:NgbSlideEvent){
    
    this.slide = (Number.parseInt(event.current))
    console.log(this.slide)
  }

}
