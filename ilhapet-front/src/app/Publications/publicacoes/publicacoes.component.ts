import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import IBlog from 'src/app/interfaces/IBlog';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {
  constructor(
    public router: Router,
    public pubService: BlogService,
    public authService: AuthService
  ){}


  ngOnInit(): void {
    this.pubService.get(this.pageIndex).subscribe((data)=>{
      this.pubs = data.content
      this.pageSize = data.pageable.pageSize
      this.length = data.totalElements
      this.pageIndex = data.number
    })
    this.loaded=true
  }

  converteData(data:string){
    return new Date(data+"Z").toLocaleString('pt-br',{timeZone:'America/Sao_Paulo'});
  }

  

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.loaded = false
    this.pubService.get(this.pageIndex).subscribe((data)=>{    
      this.pubs = data.content
      this.pageSize = data.pageable.pageSize
      this.length = data.totalElements
      this.pageIndex = data.number
      this.loaded = true
    });
    
  }

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

  pubs:IBlog[]=[]

  pageEvent: PageEvent

  verifica():boolean{
    let key = localStorage.getItem('T-WMS_token')
    
    return (key==undefined)
  }

  verificaNivel():boolean{
    let key = localStorage.getItem('T-WMS_token')
    //console.log((key==undefined)?false:(this.authService.validateRole(['ROLE_ADMIN'])));
    
    return (key==undefined)?false:(this.authService.validateRole(['ROLE_ADMIN']))
  }

}
