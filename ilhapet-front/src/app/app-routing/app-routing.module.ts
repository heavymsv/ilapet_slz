import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateConsultaComponent } from '../CreateAppontement/create-consulta/create-consulta.component';
import { CreateExameComponent } from '../CreateAppontement/create-exame/create-exame.component';
import { CreateVacinaComponent } from '../CreateAppontement/create-vacina/create-vacina.component';
import { CreatorOfAppointmentsComponent } from '../CreateAppontement/creator-of-appointments/creator-of-appointments.component';
import { LoginComponent } from '../LoginECadastro/login/login.component';
import { CadastroComponent } from '../LoginECadastro/cadastro/cadastro.component';
import { CriarAlertaComponent } from '../Publications/criar-alerta/criar-alerta.component';
import { NovaPublicacaoComponent } from '../Publications/nova-publicacao/nova-publicacao.component';
import { HistoricoConVacExaComponent } from '../Admin/historico-con-vac-exa/historico-con-vac-exa.component';
import { TelAdmComponent } from '../Admin/tel-adm/tel-adm.component';
import { PublicacoesComponent } from '../Publications/publicacoes/publicacoes.component';
import { HomeComponent } from '../Publications/home/home.component';
import { HistoricoEspecificoComponent } from '../Admin/historico-especifico/historico-especifico.component';
import { UmaPublicacaoComponent } from '../Publications/uma-publicacao/uma-publicacao.component';
import { DadosClienteComponent } from '../LoginECadastro/dados-cliente/dados-cliente.component';
import { AuthGuardService } from '../services/auth-guard.service';
import { ShowCertificateComponent } from '../show-certificate/show-certificate.component';

const routes: Routes = [
  {
    path: 'compromissos',
    component: CreatorOfAppointmentsComponent,
    canActivate: [AuthGuardService],
    data: {
      expectedRoles: ["ROLE_CLIENT","ROLE_ADMIN"]
    }
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
  },
  {
    path: 'gerar-alerta',
    component: CriarAlertaComponent,
    canActivate: [AuthGuardService],
    data: {
      expectedRoles: ["ROLE_ADMIN"]
    }
  },
  {
    path: 'nova-pub',
    component: NovaPublicacaoComponent,
    canActivate: [AuthGuardService],
    data: {
      expectedRoles: ["ROLE_ADMIN"]
    }
  },
  {
    path: 'adm',
    component: TelAdmComponent,
    canActivate: [AuthGuardService],
    data: {
      expectedRoles: ["ROLE_ADMIN"]
    }
  },
  {
    path: 'pubs',
    component: PublicacoesComponent
  },
  {
    path: 'pub/:publicacao',
    component: UmaPublicacaoComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'baixa/:compromisso',
    component: HistoricoEspecificoComponent,
    canActivate: [AuthGuardService],
    data: {
      expectedRoles: ["ROLE_ADMIN"]
    }
  },
  {
    path: 'dados',
    component: DadosClienteComponent,
    canActivate: [AuthGuardService],
    data: {
      expectedRoles: ["ROLE_CLIENT","ROLE_ADMIN"]
    }
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
