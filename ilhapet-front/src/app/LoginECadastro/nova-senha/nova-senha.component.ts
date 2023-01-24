import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import IUser from 'src/app/interfaces/IUser';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nova-senha',
  templateUrl: './nova-senha.component.html',
  styleUrls: ['./nova-senha.component.css']
})
export class NovaSenhaComponent {
  email: string = ""
  senha: string = ""
  senhaRepetir: string = ""
  nome: string = ""
  telefone: string = ""
  form: FormGroup;
  isLoading: boolean = false;
  isError: boolean = false;
  user:IUser
  token:string;
  ref1:string=''
  ref2:string=''

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activateRoute: ActivatedRoute,
    public router: Router,
    private notificationService: ToastrService,
    
  ) { }

  ngOnInit(): void {

    this.activateRoute.queryParams
      .subscribe(params => {
        // this.userService.confirmEmail(params['token']).subscribe(res=>{
        //   console.log(res)
        //   this.msg=res;
        // }, err=>{
        //   this.msg=err.error.message})
        this.token = params['token']
      })

    this.configureForm();
    

  }

  configureForm() {
    this.form = this.formBuilder.group({
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

    let password = this.form.controls['password'].value;
    let repPassword = this.form.controls['repPassword'].value;

    if (password == repPassword) {
      this.userService.changePassword(this.token, password).subscribe(
        response => {
        },
        (error) => {
  
          this.notificationService.error(error.error.message, 'Erro!', {
            progressBar: true,
          });
        },
  
        () => {
          this.notificationService.success(`Senha alterada com sucesso.`,
            'Sucesso!',
            { progressBar: true }
          )
          setTimeout(() => {
            this.router.navigate(["home"])
          }, 2000);
          ;
        }
      );

    }
  }

}
