import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import IBlog from 'src/app/interfaces/IBlog';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-uma-publicacao',
  templateUrl: './uma-publicacao.component.html',
  styleUrls: ['./uma-publicacao.component.css']
})
export class UmaPublicacaoComponent implements OnInit {
  blog:IBlog
  isLoaded=false

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    public router: Router
    ) {
  }
  ngOnInit(): void {
    this.blogService.getById(Number.parseInt(this.route.snapshot.paramMap.get('publicacao'))).subscribe((data)=>{
      //console.log(data);
      
      this.blog = data
      this.isLoaded = true

      //console.log(this.blog.texto.normalize())
    })

    
  }

  verifica():boolean{
    let key = localStorage.getItem('T-WMS_token')
    return key==undefined
  }

}
