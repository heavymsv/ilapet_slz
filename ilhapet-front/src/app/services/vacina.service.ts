import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IVacina from '../interfaces/IVacina';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class VacinaService {
  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  get(){
    return this.http.get<IVacina[]>('http://localhost:8080/vacina/list?term='
    , {
      headers: this.auth.buildHeader(),
    });
  }

  getById(id: number){
    return this.http.get<IVacina[]>(`http://localhost:8080/vacina/${id}`
    , {
      headers: this.auth.buildHeader(),
    });
  }

  update(id: number, data: IVacina) {
    return this.http.put<IVacina>(`http://localhost:8080/vacina/${id}`, data
    , {
      headers: this.auth.buildHeader(),
    });
  }

  create(data: IVacina) {
    return this.http.post<IVacina>('http://localhost:8080/vacina', data
    , {
      headers: this.auth.buildHeader(),
    });
  }

}
