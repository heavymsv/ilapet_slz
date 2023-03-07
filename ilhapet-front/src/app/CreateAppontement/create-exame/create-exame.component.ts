import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment } from 'moment';
import { ExameService } from 'src/app/services/exame.service';
import IExame from 'src/app/interfaces/IExame';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProcedimentoService } from 'src/app/services/procedimento.service';
import IPet from 'src/app/interfaces/IPet';
import IProced from 'src/app/interfaces/IProced';
import IVets from 'src/app/interfaces/IVets';
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
  selector: 'app-create-exame',
  templateUrl: './create-exame.component.html',
  styleUrls: ['./create-exame.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class CreateExameComponent implements OnInit {

  exames: IExame[] = []
  @Input() pets: IPet[]
  @Input() veterinarios: IVets[]

  veterinariosCorreto: IVets[] = []

  filterDays: number[] = []
  hours: string[] = []

  form: FormGroup;
  isLoading: boolean = false;
  isError: boolean = false;

  constructor(
    private exameService: ExameService,
    private formBuilder: FormBuilder,
    public router: Router,
    private notificationService: ToastrService,
    private procedService: ProcedimentoService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {

    if (!(this.veterinarios === undefined)) {

      this.veterinarios.map((vet) => {
        if (vet.especs.includes(1)) {
          this.veterinariosCorreto.push(vet)
        }
      })

    }

    this.exameService
      .get()
      .subscribe((data) => {
        this.exames = data
      })

    this.configureForm();//console.log("inicio")
  }

  configureForm() {
    this.form = this.formBuilder.group({
      vet: ['', [Validators.required]],
      exame: ['', [Validators.required]],
      pet: ['', [Validators.required]],
      data: ['', [Validators.required]],
      hora: ['', [Validators.required]],
    });
  }


  myFilter = (d: any): boolean => {
    if (d === undefined) return false
    const day = d.weekday();
    // Prevent Saturday and Sunday from being selected.
    ////console.log(day)
    return this.filterDays.includes(day);
  };

  selectVet = () => {
    this.filterDays = this.form.controls["vet"].value.days
  }

  diaSelec = ($event: any) => {

    this.hours = this.form.controls["vet"].value.hours[this.filterDays.indexOf((new Date(this.form.controls["data"].value._d)).getDay())]
    //this.hours = this.form.controls["data"].value
  }

  submit() {
    this.isLoading = true
    this.isError = false
    let vet = this.form.controls['vet'].value;
    let pet2: IPet = this.form.controls['pet'].value;

    let pet: IPet = { id: pet2.id }
    let tipoProcedimento = this.form.controls['exame'].value.id;
    let procedimentoId = 1;
    let data: Date = this.form.controls['data'].value.toDate();
    let hora: string[] = this.form.controls['hora'].value.split(":");
    //console.log(data);

    //console.log('hours: ', hora);

    data.setHours(Number.parseInt(hora[0]));
    data.setMinutes(Number.parseInt(hora[1]));

    //console.log('vet: ',vet);
    //console.log('pet: ',pet);
    //console.log('timestamp: ', data);

    let proced: IProced = {
      date: data,
      pet: pet,
      veterinario: vet,
      procedimentoId: procedimentoId,
      tipoProcedimento: tipoProcedimento
    };

    //console.log("proced: ",proced)


    this.procedService.create(proced).subscribe(
      (response) => {

        this.isLoading = false
        this.notificationService.success('Exame marcado com sucesso!!', 'Sucesso!', {
          progressBar: true,
        });
        this.form.reset()
        this.router.navigate(['']).then(() => {
          this.navigateByAuth()
        })
      },
      (error) => {
        this.isLoading = false
        console.log(error);

        this.notificationService.error('Não é possível marcar neste horário, favor escolher outro!!', 'Erro!', {
          progressBar: true,
        });
      }
    );

  }

  navigateByAuth() {
    if (localStorage.getItem('T-WMS_token')) {
      if (this.authService.validateRole(['ROLE_ADMIN'])) {
        this.router.navigate(['adm']);
      }
      else {
        this.router.navigate(['compromissos']);
      }
    }
  }

}
