import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import IVets from 'src/app/interfaces/IVets';
import { VeterinarioService } from 'src/app/services/veterinario.service';

@Component({
  selector: 'app-gerencia-vet',
  templateUrl: './gerencia-vet.component.html',
  styleUrls: ['./gerencia-vet.component.css']
})
export class GerenciaVetComponent implements OnInit {

  form: FormGroup;
  isLoading: boolean = false;
  isError: boolean = false;
  @Input() vets: IVets[]
  days = [0, 1, 2, 3, 4, 5, 6]
  weekdayChecked = [false, false, false, false, false, false, false]
  zeroWeekdayChecked = [false, false, false, false, false, false, false]
  espec: number[] = [];
  weekdays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
  hours = ['8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00']
  teste: any = true
  nameMedico: IVets
  nameG: string
  checkEspec: boolean[] = [false, false, false, false]
  zeroCheckEspec: boolean[] = [false, false, false, false]
  checkHours: boolean[][] = Array.from({length: 7}, (_, i) => (Array.from({length: this.hours.length}, (_, i) => false)) )
  zeroCheckHours: boolean[][] = Array.from({length: 7}, (_, i) => (Array.from({length: this.hours.length}, (_, i) => false)) )


  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private notificationService: ToastrService,
    private vetService: VeterinarioService
  ) { }
  ngOnInit(): void {

    this.configureForm()

  }

  submit() {

    //console.log(this.nameG);

    let nameL = this.form.controls['name'].value;

    let especL = this.espec;

    let daysL: number[] = [];

    let hoursL: string[][] = [];

    let j=0;

    //console.log("dias: " + this.weekdayChecked)

    for(let i=0;i<7;i++){
      //console.log("log " + this.weekdays[i] + " : " + this.weekdayChecked[i]);
      if(this.weekdayChecked[i]){
        daysL.push(i)
        let k = 0;

        let support:string[] = [];

        for(let hour of this.hours){
          if(document.getElementsByName(this.weekdays[i]+hour)[0].ariaChecked=='true'){
            support.push(document.getElementsByName(this.weekdays[i]+hour)[0].getAttribute('value'));
          }
        }

        if(hoursL===undefined){
          hoursL = [support]
        }else{
          hoursL.push(support)
        }
      }
      j++
    }

    let vet:IVets={
      name:nameL,
      days:daysL,
      especs:especL,
      hours:hoursL
    }

    //console.log(this.nameMedico);

    //console.log(vet);
    

    if(this.nameMedico===undefined){
      this.vetService.create(vet).subscribe((response)=>{
        //console.log(response)
        window.location.reload()
      })
    }else{
      vet.id = this.nameMedico.id
      this.vetService.update(vet.id,vet).subscribe((response)=>{
        //console.log(response)
        window.location.reload()
      })
    }

    //window.location.reload()

  }

  configureForm() {
    this.form = this.formBuilder.group({
      vet: ['', [Validators.nullValidator]],
      name: ['', [Validators.nullValidator]],
    });

    for (let day in this.days) {
      this.form.addControl('weekday' + this.weekdays[day], new FormControl('', Validators.nullValidator))
    }

  }

  myFilter = (d: any): boolean => {
    if (d === undefined) return false
    const day = d.weekday();
    // Prevent Saturday and Sunday from being selected.
    ////console.log(day)
    return day !== 0 && day !== 6;
  };

  selectVet = () => {

    this.nameMedico = this.form.controls['vet'].value

    this.form.reset()

    this.form.controls['vet'].setValue(this.nameMedico)

    this.form.controls['name'].setValue((this.nameMedico===undefined)?'':this.nameMedico.name)

    //console.log(this.nameMedico.especs);
    //console.log(this.nameMedico.days);
    //console.log(this.nameMedico.hours);

    this.espec = []

    //console.log("testando zerar")
    //console.log(this.weekdayChecked);
    //console.log(this.checkEspec);
    //console.log(this.checkHours);

    this.weekdayChecked = this.zeroWeekdayChecked
    this.checkEspec = this.zeroCheckEspec
    this.checkHours = this.zeroCheckHours
    
    for(let i=0;i<4;i++){
      this.checkEspec[i] = false
      if(this.nameMedico.especs.indexOf(i)!=-1){
        this.checkEspec[i] = true
        this.espec.push(i)
      }else{
        this.checkEspec[i] = false
      }
    }

    let index = 0;

    for(let i=0;i<7;i++){
      for(let j=0;j<this.hours.length;j++){
        this.checkHours[i][j] = false;
      }
    }

    for(let i=0;i<7;i++){
      this.weekdayChecked[i] = false
      if(this.nameMedico.days.indexOf(i)!=-1){
        this.weekdayChecked[i] = true

        //console.log("hours: ",this.nameMedico.hours[index]);

        for(let hour in this.nameMedico.hours[index]){
          //console.log("hour: ", this.nameMedico.hours[index][hour]);
          //console.log("index: ", i);
          //console.log("index2: ", this.hours.indexOf(this.nameMedico.hours[index][hour]));
          this.checkHours[i][this.hours.indexOf(this.nameMedico.hours[index][hour])] = true;
        }

        index++
        

      }else{
        this.weekdayChecked[i] = false
      }
    }

    //console.log(this.checkHours);
    

  }

  printar = (day: number, $event: any) => {

    this.weekdayChecked[day] = $event.checked
    //console.log($event);

    //console.log(this.weekdayChecked);


    for(let i=0;i<7;i++){

      if(this.weekdayChecked[i]){
        for(let hour of this.hours){
          if(document.getElementsByName(this.weekdays[i]+hour)[0].ariaChecked=='true'){
            //console.log(document.getElementsByName(this.weekdays[i]+hour)[0].getAttribute('value'));
          }
        }
      }
    
    }

  }

  printar2 = () => {
    //console.log(this.teste);
  }

  printar3 = ($event: any) => {
    //console.log($event);
  }

  specs = (num: number, $event: any) => {
    //console.log($event.checked);

    if ($event.checked) {
      this.espec.push(num - 1)
    } else {
      this.espec.splice(this.espec.indexOf(num - 1), 1)
    }

    //console.log(this.espec);

  }

}
