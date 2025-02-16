import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../models/login.response';

@Injectable({
  providedIn: 'root',
})
export class AtomicoService {
  constructor(private http: HttpClient) {}

  login(cpf?: string, senha?: string) {
    const url = '/v1/api/signin';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });

    return this.http.post<LoginResponse>(
      url,
      JSON.stringify({
        cpf: cpf,
        senha: senha,
      }),
      { headers: headers }
    );
  }
}
