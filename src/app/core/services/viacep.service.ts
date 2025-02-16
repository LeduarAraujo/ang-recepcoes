import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ViaCEP } from '../models/viacep';

@Injectable({
  providedIn: 'root',
})
export class ViacepService {
  constructor(private http: HttpClient) {}

  consultarCep(cep: string) {
    const url = 'https://viacep.com.br/ws/' + cep + '/json/';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });

    return this.http.get<ViaCEP>(url, { headers: headers });
  }
}
