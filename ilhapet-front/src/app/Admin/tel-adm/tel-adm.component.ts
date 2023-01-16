import { Component, OnInit } from '@angular/core';
import IUser from 'src/app/interfaces/IUser';
import IVets from 'src/app/interfaces/IVets';
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
      console.log('users: ',data);
      
      this.users = data.filter((user:IUser)=>{return user.accessLevel.authority=='ROLE_CLIENT'});
    })
  }

  
  
}
