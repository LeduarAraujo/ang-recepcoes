import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './feature/login/login.component';
import { CadastroEspacoComponent } from './feature/cadastro-espaco/cadastro-espaco.component';
import { ConsultaAgendaComponent } from './feature/consulta-agenda/consulta-agenda.component';

export const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cadastro-espaco', component: CadastroEspacoComponent},
  {path: 'consultar-agenda', component: ConsultaAgendaComponent},
];
