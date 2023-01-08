import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import IPet from 'src/app/interfaces/IPet';
import { PetService } from 'src/app/services/pet.service';
import IUser from 'src/app/interfaces/IUser';


@Component({
  selector: 'app-gerenciar-pets',
  templateUrl: './gerenciar-pets.component.html',
  styleUrls: ['./gerenciar-pets.component.css']
})
export class GerenciarPetsComponent implements OnInit {

  @Input() pets: IPet[]
  @Input() user: IUser
  form: FormGroup;
  isLoading: boolean = false;
  isError: boolean = false;
  panelOpenState: boolean
  displayedColumns: string[] = ['nome', 'tipo'];

  ngOnInit(): void {
    this.configureForm();
  }
  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private petService: PetService,
    private notificationService: ToastrService,
  ) { }

  configureForm() {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
    });
  }

  submit() {
    this.isLoading = true
    this.isError = false
    let user:IUser = {id:this.user.id,username:this.user.username}

    let pet: IPet = {
      user: user,
      name: this.form.controls['nome'].value,
      tipo: this.form.controls['tipo'].value
    };

    console.log("pet: ", pet)


    this.petService.create(pet).subscribe(
      (response) => {

        this.isLoading = false
        this.petService.getByOwner(this.user.id).subscribe((data)=>{
          this.pets=data
        })
        this.notificationService.success('Pet inserido com sucesso!!', 'Novo Pet!', {
          progressBar: true,
        });
        this.form.reset()
      },
      (error) => {
        this.isLoading = false
        this.notificationService.error('Não foi possivel registrar!!', 'Erro!', {
          progressBar: true,
        });
      }
    );

  }

}
