import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Espaco } from './../models/espaco';
import { ListarespacoResponse } from './../models/listarespaco.response';

@Injectable({
  providedIn: 'root',
})
export class AtomicoJwtService {
  constructor(private http: HttpClient) {}

  /*
   * - Sesão dos Espaços
   */
  incluirEspaco(token_jwt: string, idFuncionario: number, espaco: Espaco, logoEspaco: Blob) {
    const url = 'http://localhost:8080/api/v1/incluirespaco';
    let headers = new HttpHeaders({
      'accept': 'application/json',
      token_jwt: token_jwt,
      idFuncionario: idFuncionario.toString()
    });

    const formData: FormData = new FormData();
    formData.append('nmEspaco', espaco.nmEspaco);
    formData.append('dsEndereco', espaco.dsEndereco);
    formData.append('instagram', espaco.instagram);
    formData.append('logoEspaco',  logoEspaco);

    return this.http.post<Response>(url, formData, { headers: headers });
  }

  listarEspacos(token_jwt: string, idFuncionario: number) {
    const url = 'http://localhost:8080/api/v1/listarespacos';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      token_jwt: token_jwt,
      idFuncionario: idFuncionario,
    });

    return this.http.get<ListarespacoResponse>(url, { headers: headers });
  }

  /*
   * - Sesão dos Usuarios
   */

  getAgendaEspaco(token_jwt: string, idEspaco: number, year: number, month: number) {
    const url = 'http://localhost:8080/api/v1/agendaespaco';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      token_jwt: token_jwt,
      idEspaco: idEspaco.toString(),
      year: year.toString(),
      month: month.toString(),
    });

    return this.http.get(url, { headers: headers });
  }

}
