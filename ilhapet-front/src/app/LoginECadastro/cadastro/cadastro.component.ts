import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import IRole from 'src/app/interfaces/IRole';
import IUser from 'src/app/interfaces/IUser';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  email: string = ""
  senha: string = ""
  senhaRepetir: string = ""
  nome: string = ""
  telefone: string = ""
  form: FormGroup;
  isLoading: boolean = false;
  isError: boolean = false;
  user:IUser

  ref1:string=''
  ref2:string=''

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    
    public router: Router,
    private notificationService: ToastrService,
    
  ) { }

  ngOnInit(): void {
    this.configureForm();
    

  }

  configureForm() {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],
      repPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  submit() {
    this.isLoading = true
    this.isError = false
    let email = this.form.controls['email'].value;
    let nome = this.form.controls['nome'].value;
    let telefone = this.form.controls['telefone'].value;

    let password = this.form.controls['password'].value;
    let repPassword = this.form.controls['repPassword'].value;
    let role:IRole ={authority:1,id:1} 

    let user:IUser={email:email,password:password,username:nome,acessLevel:role,telefone:telefone}

    if (password == repPassword) {
      this.userService.signup(user).subscribe(
        (response) => {
          this.notificationService.success('Favor verifique seu inbox!!', 'Sucesso!', {
            progressBar: true,
          });
          this.router.navigate(['login']);
          this.isLoading = false
        },
        (error) => {
          this.isLoading = false
          this.notificationService.error('E-mail ou senha errados!!', 'Error!', {
            progressBar: true,
          });
        }
      );
    }else{
      this.notificationService.error('As senhas não são correspondentes!!', 'Error!', {
        progressBar: true,
      });
    }

  }

}
