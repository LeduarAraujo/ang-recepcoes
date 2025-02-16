import { ViaCEP } from './../../core/models/viacep';
import { ListarespacoResponse } from './../../core/models/listarespaco.response';
import { AtomicoJwtService } from './../../core/services/atomico-jwt.service';
import { Component } from '@angular/core';
import { Espaco } from './../../core/models/espaco';
import { NgFor } from '@angular/common';
import { ViacepService } from '../../core/services/viacep.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro-espaco',
  imports: [
    FormsModule,
    NgFor
  ],
  templateUrl: './cadastro-espaco.component.html',
  styleUrl: './cadastro-espaco.component.scss'
})
export class CadastroEspacoComponent {

  token_jwt: string = 'asd';
  idFuncionario: number = 1;
  listaEspacos: Espaco[] = [];

  espaco: Espaco = {
    nmEspaco: '',
    dsEndereco: '',
    siAtivo: '',
    instagram: '',
    logoEspaco: '',
  };

  cep: string = '';
  rua: string = '';
  numero: string = '';
  logoEspaco: Blob | undefined;
  viaCEP: ViaCEP | undefined;

  constructor(
    private atomicoJwtService: AtomicoJwtService,
    private viacepService: ViacepService
  ) {
    this.listarEspacos();
   }

   listarEspacos() {
    this.atomicoJwtService.listarEspacos(this.token_jwt, this.idFuncionario)
      .subscribe((response: ListarespacoResponse) => {
        this.listaEspacos = response.listaEspacos;
    }, err => alert(err.error.message));
   }

   getDsAtivo(siAtivo: string): string {
     return siAtivo === 'S' ? 'Ativo' : 'Inativo';
   }

   consultarCep() {
    this.viacepService.consultarCep(this.cep).subscribe(
      (response) => {
        this.viaCEP = response;
        this.rua = response.logradouro;
      },
      (err) => alert(err.error.message)
    );
  }

  incluirEspaco() {
    if (this.viaCEP) {
      this.espaco.dsEndereco = this.viaCEP.logradouro + ', ' + this.numero + ' - ' +
        this.viaCEP.bairro + ', ' + this.viaCEP.localidade + ' ' + this.viaCEP.cep;

      if (this.logoEspaco) {
        this.atomicoJwtService.incluirEspaco(this.token_jwt, this.idFuncionario, this.espaco, this.logoEspaco)
        .subscribe(() => {
          alert('Espaço cadastrado com sucesso!');
          this.listarEspacos();
          this.limparCamposModal();
        }, err => alert(err.error.message));
      } else {
        alert('Imagem não encontrada.');
      }

    } else {
      alert('CEP não encontrado.');
    }
  }

  limparCamposModal() {
    this.espaco = {
      nmEspaco: '',
      dsEndereco: '',
      siAtivo: '',
      instagram: '',
      logoEspaco: '',
    };
    this.cep = '';
    this.rua = '';
    this.numero = '';
    this.viaCEP = undefined
    this.logoEspaco = undefined
  }

  handleFileInput(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      const byteCharacters = atob(base64String.split(',')[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      this.logoEspaco = new Blob([byteArray], { type: file.type });
    };
    reader.readAsDataURL(file);
  }
}
