import { Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment} from 'moment';
import { VeterinarioService } from 'src/app/services/veterinario.service';
import IVets from 'src/app/interfaces/IVets';
import { PetService } from 'src/app/services/pet.service';
import IPet from 'src/app/interfaces/IPet';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProcedimentoService } from 'src/app/services/procedimento.service';
import IProced from 'src/app/interfaces/IProced';
import { isEmpty } from 'rxjs';
import IUser from 'src/app/interfaces/IUser';
import { AuthService } from 'src/app/services/auth.service';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMMM YYYY',
  },
};

@Component({
  selector: 'app-create-consulta',
  templateUrl: './create-consulta.component.html',
  styleUrls: ['./create-consulta.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})



export class CreateConsultaComponent implements OnInit{
  
  @Input() veterinarios:IVets[]
  @Input() pets: IPet[]
  form: FormGroup;
  isLoading: boolean = false;
  isError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private notificationService: ToastrService,
    private procedService: ProcedimentoService,
    public authService:AuthService
  ){}

  ngOnInit(): void {
  
    this.configureForm();

  }

  configureForm() {
    this.form = this.formBuilder.group({
      vet: ['', [Validators.required]],
      pet: ['', [Validators.required]],
      sintomas: ['',[]],
      data: ['',[Validators.required]],
      hora:['',[Validators.required]],
    });
  }


  myFilter = (d: any): boolean => {
    if(d===undefined) return false
    const day = d.weekday();
    // Prevent Saturday and Sunday from being selected.
    //console.log(day)
    return day !== 0 && day !== 6;
  };

  submit() {
    this.isLoading = true
    this.isError = false
    let vet = this.form.controls['vet'].value;
    let pet2:IPet = this.form.controls['pet'].value;
  
    let pet:IPet={id:pet2.id}

    console.log(pet);
    
    
    let tipoProcedimento = 1;
    let procedimentoId = 0;
    let data:Date = this.form.controls['data'].value.toDate();
    let hora:string[] = this.form.controls['hora'].value.split(":");
    console.log(data);

    

    data.setHours(Number.parseInt(hora[0]));
    data.setMinutes(Number.parseInt(hora[1]));
    
    let sintomas = this.form.controls['sintomas'].value;

    
    

    let proced:IProced = {date: data,
                          pet: pet,
                          veterinario: vet,
                          procedimentoId: procedimentoId,
                          tipoProcedimento: tipoProcedimento,
                          sintomas: sintomas};
    
    
  
  
    this.procedService.create(proced).subscribe(
      (response) => {
    
        this.isLoading = false
        this.notificationService.success('Consulta marcada com sucesso!!', 'Sucesso!', {
          progressBar: true,
        });
        this.form.reset()
        this.router.navigate(['']).then(()=>{

          this.navigateByAuth()
        })
      },
      (error) => {
        this.isLoading = false
        this.notificationService.error('Não foi possivel registrar!!', 'Erro!', {
          progressBar: true,
        });
      }
    );
    
  }

  navigateByAuth(){
    if(localStorage.getItem('T-WMS_token')){
      if(this.authService.validateRole(['ROLE_ADMIN'])){
        this.router.navigate(['adm']);
      }
      else{
        this.router.navigate(['compromissos']);
      }
    }
  }
}
