import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-card-pub',
  templateUrl: './card-pub.component.html',
  styleUrls: ['./card-pub.component.css']
})
export class CardPubComponent {
@Input() id:number

constructor(
  public router: Router,
  public pubService: BlogService
){}

  deletaPub(){
    console.log(this.id);
    
    this.pubService.delete(this.id).subscribe(()=>{
      window.location.reload()
    })
    
    
  }

}
