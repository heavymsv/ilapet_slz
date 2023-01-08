import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import ICliente from 'src/app/interfaces/ICliente';
import IRole from 'src/app/interfaces/IRole';
import IUser from 'src/app/interfaces/IUser';
import { AuthService } from 'src/app/services/auth.service';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dados-cliente',
  templateUrl: './dados-cliente.component.html',
  styleUrls: ['./dados-cliente.component.css']
})
export class DadosClienteComponent {
  nome: string = ""
  telefone: string = ""
  email: string = ""
  name: string = ""
  tel: string = ""
  mail: string = ""
  form: FormGroup;
  isLoading: boolean = false;
  isError: boolean = false;
  user: IUser

  ref1:string=''
  ref2:string=''

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    
    
    public router: Router,
    private notificationService: ToastrService,
    public authService:AuthService
  ) { }

  ngOnInit(): void {
    this.configureForm();
    this.userService.getByName(this.authService.getUsername()).subscribe((data)=>{
      this.user = data;
      
        this.name = data.name
        this.tel = data.telefone
        this.mail = data.email
      })

  }

  configureForm() {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]], 
      telefone: ['', [Validators.required]],
     
    });
  }

  submit() {
    this.isLoading = true
    this.isError = false

    let nome = this.form.controls['nome'].value;
    let telefone = this.form.controls['telefone'].value;


    let user:IUser={username:nome,telefone:telefone}

    
    this.userService.signup(user).subscribe(
      (response) => {
        this.notificationService.success('Informações Alteradas com sucesso!!', 'Sucesso!', {
          progressBar: true,
        });
        this.router.navigate(['login']);
        this.isLoading = false
      },
      (error) => {
        this.isLoading = false
        this.notificationService.error('Não foi possível alterar os campos!!', 'Error!', {
          progressBar: true,
        });
      }
    );
    
  }

}


