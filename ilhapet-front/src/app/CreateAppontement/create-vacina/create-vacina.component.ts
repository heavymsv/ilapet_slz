import { OnInit, Component, Input} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment} from 'moment';
import { VacinaService } from 'src/app/services/vacina.service';
import IVacina from 'src/app/interfaces/IVacina';
import IVets from 'src/app/interfaces/IVets';
import IPet from 'src/app/interfaces/IPet';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProcedimentoService } from 'src/app/services/procedimento.service';
import IProced from 'src/app/interfaces/IProced';
import { AuthService } from 'src/app/services/auth.service';

const moment = _rollupMoment || _moment;

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
  selector: 'app-create-vacina',
  templateUrl: './create-vacina.component.html',
  styleUrls: ['./create-vacina.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class CreateVacinaComponent implements OnInit {

  @Input() veterinarios:IVets[]
  veterinariosCorreto:IVets[]=[]
  @Input() pets: IPet[]
  form: FormGroup;
  isLoading: boolean = false;
  isError: boolean = false;

  filterDays: number[] = []
  hours:string[] = []

  vacinas:IVacina[]=[]
  vacinasASelecionar:IVacina[]=[]
  doses:number[]=[]

  constructor(
    private vacinaService:VacinaService,
    private formBuilder: FormBuilder,
    public router: Router,
    private notificationService: ToastrService,
    private procedService: ProcedimentoService,
    public authService:AuthService
  ){}

  ngOnInit(): void {

    this.veterinarios.map((vet)=>{
      if(vet.especs.includes(2)){
        this.veterinariosCorreto.push(vet)
      }
    })
    
    this.vacinaService
    .get()
    .subscribe((data)=>{
      this.vacinas = data
      //this.form.controls['vacina'].setValue(this.vacinas[0])
      this.gerarDoses()
    })

    this.configureForm();

    this.form.controls['vacina'].valueChanges.subscribe(()=>
      this.gerarDoses()
    )


  }

  configureForm() {
    this.form = this.formBuilder.group({
      vet: ['', [Validators.required]],
      pet: ['', [Validators.required]],
      vacina: ['',[Validators.required]],
      dose: ['',[Validators.required]],
      data: ['',[Validators.required]],
      hora:['',[Validators.required]],
    });
  }

  myFilter = (d: any): boolean => {
    if(d===undefined) return false
    const day = d.weekday();
    // Prevent Saturday and Sunday from being selected.
    //console.log(day)
    return this.filterDays.includes(day);
  };
  
  selectVet = () =>{
    this.filterDays = this.form.controls["vet"].value.days
  }

  diaSelec = ($event:any) => {
    
    this.hours = this.form.controls["vet"].value.hours[this.filterDays.indexOf((new Date(this.form.controls["data"].value._d)).getDay())]
    //this.hours = this.form.controls["data"].value
  }

  gerarDoses(){
    this.doses=[]
    console.log(this.form.controls['vacina'].value);

    let limite = this.form.controls['vacina'].value.doses
    for(let i=1;i<=limite;i++){
      this.doses.push(i)
    }
  }

  changePet($event:any){

    //this.form.controls['vacina'].setValue(null)
    this.vacinasASelecionar = this.vacinas.filter((vacina:IVacina)=>{
      console.log('tipo: ',vacina.tipo);
      console.log('tipo A Selec: ',this.form.controls['pet'].value.tipo);
      
      return vacina.tipo == this.form.controls['pet'].value.tipo
    })

  }
  
  submit() {
    this.isLoading = true
    this.isError = false
    let vet = this.form.controls['vet'].value;
    let pet2:IPet = this.form.controls['pet'].value;

    let pet:IPet={id:pet2.id}
    let tipoProcedimento = this.form.controls['vacina'].value.id;
    let procedimentoId = 2;
    let data:Date = this.form.controls['data'].value.toDate();
    let hora:string[] = this.form.controls['hora'].value.split(":");
    console.log(data);

    console.log('hours: ', hora);

    data.setHours(Number.parseInt(hora[0]));
    data.setMinutes(Number.parseInt(hora[1]));
    
    let dose = this.form.controls['dose'].value + "º dose";

    console.log('vet: ',vet);
    console.log('pet: ',pet);
    console.log('dose: ', dose);
    console.log('timestamp: ', data);

    let proced:IProced = {date: data,
                          pet: pet,
                          veterinario: vet,
                          procedimentoId: procedimentoId,
                          tipoProcedimento: tipoProcedimento,
                          sintomas: dose};
    
    console.log("proced: ",proced)
  
  
    this.procedService.create(proced).subscribe(
      (response) => {
    
        this.isLoading = false
        this.notificationService.success('Vacina marcada com sucesso!!', 'Sucesso!', {
          progressBar: true,
        });
        this.form.reset()
        this.router.navigate(['']).then(()=>{
          this.navigateByAuth
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
