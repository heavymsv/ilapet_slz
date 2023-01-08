import { Component, OnInit } from '@angular/core';
import IUser from 'src/app/interfaces/IUser';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tel-adm',
  templateUrl: './tel-adm.component.html',
  styleUrls: ['./tel-adm.component.css']
})
export class TelAdmComponent implements OnInit {
  
  users:IUser[] = []
  

  constructor(
    private userService:UserService
  ){}

  ngOnInit(): void {
    this.userService.get().subscribe((data)=>{
      this.users = data
    })
  }

  
  
}
