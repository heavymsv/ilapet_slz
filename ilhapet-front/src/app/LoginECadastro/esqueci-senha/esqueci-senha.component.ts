import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-esqueci-senha',
  templateUrl: './esqueci-senha.component.html',
  styleUrls: ['./esqueci-senha.component.css']
})
export class EsqueciSenhaComponent {
  email:string="";
  senha:string="";
  form: FormGroup;
  isLoading: boolean = false;
  isError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    public router: Router,
    private notificationService: ToastrService,
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.configureForm();
    if(localStorage.getItem('T-WMS_token')){
      if(this.authService.validateRole(['ROLE_ADMIN'])){
        this.router.navigate(['adm']);
      }
      else{
        this.router.navigate(['compromissos']);
      }
    }
  }

  configureForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  submit() {
    this.isLoading = true
    this.isError = false
    let email = this.form.controls['email'].value;
    
    this.userService.esqueciSenha(email).subscribe(
      (response) => {

        this.notificationService.info('Verifique sua caixa de email!!', 'E-mail enviado!', {
          progressBar: true,
        });
        
        this.router.navigate(['home']);
        
        this.isLoading = false
      },
      (error) => {
        this.isLoading = false
        console.log(error);
        
        this.notificationService.error('E-mail não registrado!!', 'Error!', {
          progressBar: true,
        });
      }
    );
    
  }
}
