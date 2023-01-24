import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CreateConsultaComponent } from './CreateAppontement/create-consulta/create-consulta.component';
import { CreateVacinaComponent } from './CreateAppontement/create-vacina/create-vacina.component';
import { CreateExameComponent } from './CreateAppontement/create-exame/create-exame.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import {MatTabsModule} from '@angular/material/tabs';
import { CreatorOfAppointmentsComponent } from './CreateAppontement/creator-of-appointments/creator-of-appointments.component';
import { GeralClienteComponent } from './CreateAppontement/geral-cliente/geral-cliente.component';
import { MatCardModule } from '@angular/material/card';
import { HeaderComponent } from './header_and_footer/header/header.component';
import { FooterClientComponent } from './header_and_footer/footer-client/footer-client.component';
import { FooterGeneralComponent } from './header_and_footer/footer-general/footer-general.component';
import { LoginComponent } from './LoginECadastro/login/login.component';
import { CadastroComponent } from './LoginECadastro/cadastro/cadastro.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask, IConfig } from 'ngx-mask';
import { NovaPublicacaoComponent } from './Publications/nova-publicacao/nova-publicacao.component';
import { HomeComponent } from './Publications/home/home.component';
import { PublicacoesComponent } from './Publications/publicacoes/publicacoes.component';
import { UmaPublicacaoComponent } from './Publications/uma-publicacao/uma-publicacao.component';
import { CriarAlertaComponent } from './Publications/criar-alerta/criar-alerta.component'
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
  MatProgressSpinner,
  MatProgressSpinnerModule,
} from '@angular/material/progress-spinner';
import { GerenciarPetsComponent } from './CreateAppontement/gerenciar-pets/gerenciar-pets.component';
import {MatTableModule} from '@angular/material/table';
import { HistoricoConVacExaComponent } from './Admin/historico-con-vac-exa/historico-con-vac-exa.component';
import { TelAdmComponent } from './Admin/tel-adm/tel-adm.component';
import { CardComponent } from './Admin/card/card.component';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from '@angular/material/dialog';
import { CommonModule, NgIf } from '@angular/common';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DialogOverviewExampleDialogComponent } from './CreateAppontement/dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatMenuModule} from '@angular/material/menu';

import { MatPaginatorModule } from '@angular/material/paginator';
import { HistoricoEspecificoComponent } from './Admin/historico-especifico/historico-especifico.component';
import { MarcacaoAdmComponent } from './Admin/marcacao-adm/marcacao-adm.component';
import { CardPubComponent } from './Publications/card-pub/card-pub.component';
import { DadosClienteComponent } from './LoginECadastro/dados-cliente/dados-cliente.component';
import { UsuarioAdmComponent } from './Admin/usuario-adm/usuario-adm.component';
import { ShowCertificateComponent } from './show-certificate/show-certificate.component';
import { EsqueciSenhaComponent } from './LoginECadastro/esqueci-senha/esqueci-senha.component';
import { RecuperaSenhaComponent } from './recupera-senha/recupera-senha.component';
import { NovaSenhaComponent } from './LoginECadastro/nova-senha/nova-senha.component';

export const options: Partial<null|IConfig> | (() => Partial<IConfig>) = null;


@NgModule({
  declarations: [
    AppComponent,
    CreateConsultaComponent,
    CreateVacinaComponent,
    CreateExameComponent,
    CreatorOfAppointmentsComponent,
    GeralClienteComponent,
    HeaderComponent,
    FooterClientComponent,
    FooterGeneralComponent,
    LoginComponent,
    CadastroComponent,
    NovaPublicacaoComponent,
    HomeComponent,
    PublicacoesComponent,
    UmaPublicacaoComponent,
    CriarAlertaComponent,
    GerenciarPetsComponent,
    HistoricoConVacExaComponent,
    TelAdmComponent,
    CardComponent,
    DialogOverviewExampleDialogComponent,
    HistoricoEspecificoComponent,
    MarcacaoAdmComponent,
    CardPubComponent,
    DadosClienteComponent,
    UsuarioAdmComponent,
    ShowCertificateComponent,
    EsqueciSenhaComponent,
    RecuperaSenhaComponent,
    NovaSenhaComponent,

    
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatTabsModule,
    MatCardModule,
    NgxMaskDirective, 
    NgxMaskPipe,
    ToastrModule.forRoot(),
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatTableModule,
    MatRippleModule,
    MatDialogModule,
    NgbModule,
    NgbCarouselModule, 
    NgIf,
    MatPaginatorModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatRadioModule,
    MatMenuModule
  ],
  providers: [provideNgxMask(),{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
