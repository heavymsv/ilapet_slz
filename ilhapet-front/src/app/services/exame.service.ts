import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IExame from '../interfaces/IExame';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ExameService {
  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  get(){
    return this.http.get<IExame[]>('http://localhost:8080/exame/list?term='
    , {
      headers: this.auth.buildHeader(),
    });
  }

  getById(id: number){
    return this.http.get<IExame>(`http://localhost:8080/exame/${id}`
    , {
      headers: this.auth.buildHeader(),
    });
  }

  update(id: number, data: IExame) {
    return this.http.put<IExame>(`http://localhost:8080/exame/${id}`, data
    , {
      headers: this.auth.buildHeader(),
    });
  }

  create(data: IExame) {
    return this.http.post<IExame>('http://localhost:8080/exame', data
    , {
      headers: this.auth.buildHeader(),
    });
  }
}
