import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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
      email: ['', [Validators.required, Validators.email]],
      password: [
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
    
    let password = this.form.controls['password'].value;
    this.userService.login(email, password).subscribe(
      (response) => {
        localStorage.setItem('T-WMS_token', response.access_token);
        if(this.authService.validateRole(['ROLE_ADMIN'])){
          this.router.navigate(['adm']);
        }
        else{
          this.router.navigate(['compromissos']);
        }
        
        this.isLoading = false
      },
      (error) => {
        this.isLoading = false
        this.notificationService.error('E-mail ou senha errados!!', 'Error!', {
          progressBar: true,
        });
      }
    );
    
  }

}
