import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IVacina from '../interfaces/IVacina';
import { AuthService } from './auth.service';
import { environment } from 'src/enviroment';

@Injectable({
  providedIn: 'root'
})
export class VacinaService {
  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  get(){
    return this.http.get<IVacina[]>(`${environment.apiUrl}/vacina/list?term=`
    , {
      headers: this.auth.buildHeader(),
    });
  }

  getById(id: number){
    return this.http.get<IVacina[]>(`${environment.apiUrl}/vacina/${id}`
    , {
      headers: this.auth.buildHeader(),
    });
  }

  update(id: number, data: IVacina) {
    return this.http.put<IVacina>(`${environment.apiUrl}/vacina/${id}`, data
    , {
      headers: this.auth.buildHeader(),
    });
  }

  create(data: IVacina) {
    return this.http.post<IVacina>(`${environment.apiUrl}/vacina`, data
    , {
      headers: this.auth.buildHeader(),
    });
  }

}
