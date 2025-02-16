import { Routes } from '@angular/router';
import { LoginComponent } from './feature/login/login.component';
import { CadastroEspacoComponent } from './feature/cadastro-espaco/cadastro-espaco.component';

export const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cadastro-espaco', component: CadastroEspacoComponent},
];
